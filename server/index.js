const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
require('dotenv').config();
const User = require('./models/User');
const Beneficiary = require('./models/Beneficiary')
const Transfer = require('./models/Transfer')
const jwt = require('jsonwebtoken');
const { authenticateUser } = require('./middleware/authenticateMiddleware');
const authenticateAdmin = require('./middleware/authenticateAdmin');



const app = express();

app.use(cookieParser(process.env.COOKIE_SECRET));


app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors(
{
    origin: 'http://localhost:3000',
    credentials: true
}
));


mongoose.connect(process.env.MONGO_URL);

const salt = bcrypt.genSaltSync(10);

const generateAccountNumber = () => {
    const min = 1000000000; 
    const max = 9999999999; 
    return String(Math.floor(Math.random() * (max - min + 1)) + min);
  };
  


app.post('/api/users/signup', async(req, res) => {
    try {
        const { name, mobile, email, gender, dob, address, aadhar, pan, balance, password} = req.body;
        const existingUser = await User.findOne({ email });

        if(existingUser) {
            return res.status(400).json({ error: 'Email is already registerd' });
        }

        const accountNumber = generateAccountNumber();

        const newUser = await User.create({
            name, 
            mobile, 
            email, 
            gender, 
            dob, 
            address, 
            aadhar, 
            pan, 
            balance, 
            accountNumber,
            password: bcrypt.hashSync(password, salt)
        });

        res.json({ newUser });

    } catch (error) {
        console.error(error);
        res.status(402).json({ error: 'Unexpected error occurred. Try again later'});
    }
});


app.post('/api/users/login', async(req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email })

        if(!user){
            return res.status(400).error(`Account doesn't exist`);
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).send('Invalid email or password');
        }

        const token = jwt.sign({ userId: user._id}, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('auth_token', token, {
            httpOnly: true,
            secure: false, 
            sameSite: 'Lax',
            maxAge: 2 * 60 * 60 * 1000, 
        });
        res.send({ token })
     } catch (error) {
        res.status(500).send('Error logging in' + error.message);
    }
})



app.get('/api/users/info',authenticateUser, async(req, res) => {

   try {
        const userId = req.user.userId;
        const userDetails = await User.findById(userId);
        res.status(200).json(userDetails);
   } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' })
   }

})

app.post('/api/users/reset-password', authenticateUser, async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    try {
        const userId = req.user.userId;
      const user = await User.findById(userId);
      console.log(user);
  
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: 'Current password is incorrect' });
      }
  
      const hashedPassword = await bcrypt.hash(newPassword, 10);
  
      user.password = hashedPassword;
      await user.save();
  
      res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
      console.error('Error resetting password:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  app.put('/api/users/update-user', authenticateUser, async (req, res) => {
    try {
      const { ...userData } = req.body;
      console.log(userData);
      const userId = req.user.userId
  
      const updatedUser = await User.findByIdAndUpdate(userId, {mobile: userData.contactNumber, address: userData.address, }, { new: true });
        
      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error('Error updating user profile:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


app.post('/api/users/user-logout', async( req, res ) => {
    try {
        res.clearCookie('auth_token');
        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

app.post('/api/users/add-beneficiary', authenticateUser, async(req, res) => {
    try {
        const { name, bankname, accountNumber, maxTransferLimit } = req.body;
        const userId = req.user.userId;

        const newBeneficiary = new Beneficiary({
            userId,
            name,
            bankName,
            accountNumber,
            maxTransferLimit
        })

        await newBeneficiary.save();

        res.status(201).json(newBeneficiary);

    } catch (error) {
        console.error('Error adding beneficiary:', error);
        res.status(500).json({ error: 'Internal Server Error' });    
    }
})

app.post('/api/beneficiaries/add', authenticateUser, async (req, res) => {
    try {
        const { name, bankName, accountNumber, maxTransferLimit } = req.body;
        const userId = req.user.userId;

        const newBeneficiary = await Beneficiary.create({
            name,
            bankName,
            accountNumber,
            maxTransferLimit,
            userId 
        });

        res.status(201).json(newBeneficiary);
    } catch (error) {
        console.error('Error adding beneficiary:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/api/beneficiaries', authenticateUser, async (req, res) => {
    try {
        const userId = req.user.userId;

        const beneficiaries = await Beneficiary.find({ userId });

        res.status(200).json(beneficiaries);
    } catch (error) {
        console.error('Error fetching beneficiaries:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/api/transfers',authenticateUser, async (req, res) => {
    const { beneficiaryId, amount } = req.body;

    try {
        const userId = req.user.userId;
        const user = await User.findById(userId);
        const beneficiary = await Beneficiary.findById(beneficiaryId);

        if (!user || !beneficiary) {
            return res.status(404).json({ message: 'User or Beneficiary not found' });
        }

        if (amount > beneficiary.maxTransferLimit) {
            return res.status(400).json({ message: 'Transfer amount exceeds the max transfer limit' });
        }

        if (user.balance < amount) {
            return res.status(400).json({ message: 'Insufficient funds' });
        }

        user.balance -= amount;
        await user.save();

        const debitTransfer = new Transfer({
            fromAccount: userId,
            toAccount: beneficiaryId,
            amount,
            type: 'debit'
        });
        await debitTransfer.save();

        const beneficiaryUser = await User.findOne({ accountNumber: beneficiary.accountNumber });
        if (beneficiaryUser) {
            beneficiaryUser.balance += amount;
            await beneficiaryUser.save();

            const creditTransfer = new Transfer({
                fromAccount: userId,
                toAccount: beneficiaryId,
                amount,
                type: 'credit'
            });
            await creditTransfer.save();
        }

        res.status(200).json({ message: 'Transfer successful' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
});

app.get('/api/user-transactions', authenticateUser, async (req, res) => {
    try {
        const userId = req.user.userId;

        // Fetch the user's account number from the User model
        const userDetails = await User.findById(userId);
        const accountNumber = userDetails.accountNumber;

        // Find transactions involving the user
        const transactions = await Transfer.find({
            $or: [
                { fromAccount: userId },
                { toAccount: userId , type: 'credit'}
            ]
        }).populate('fromAccount', 'accountNumber name').populate('toAccount', 'accountNumber name');

        console.log(transactions);

        const formattedTransactions = await Promise.all(transactions.map(async (transaction) => {
            if (transaction.type === 'credit') {
                // For credit transactions, fromAccount is the sender
                return {
                    date: transaction.date,
                    type: transaction.type,
                    accountNumber: transaction.fromAccount ? transaction.fromAccount.accountNumber : 'Unknown',
                    accountName: transaction.fromAccount ? transaction.fromAccount.name : 'Unknown',
                    amount: transaction.amount
                };
            } else { // 'debit'
                if (transaction.toAccount) {
                    return {
                        date: transaction.date,
                        type: transaction.type,
                        accountNumber: transaction.toAccount ? transaction.toAccount.accountNumber : 'Unknown',
                        accountName: transaction.toAccount ? transaction.toAccount.name : 'Unknown',
                        amount: transaction.amount
                    };
                } else {
                    const beneficiaryDetails = await Beneficiary.findOne({ accountNumber: transaction.toAccountNumber });
                    return {
                        date: transaction.date,
                        type: transaction.type,
                        accountNumber: beneficiaryDetails ? beneficiaryDetails.accountNumber : 'Unknown',
                        accountName: beneficiaryDetails ? beneficiaryDetails.name : 'Unknown',
                        amount: transaction.amount
                    };
                }
            }
        }));


        res.status(200).json(formattedTransactions);
    } catch (error) {
        console.error('Error fetching transaction details', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.post('/api/admin/login', (req, res) => {
    const { email, password } = req.body;
    
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.cookie('auth_token', token, { httpOnly: true, sameSite: 'Strict' });
      res.send({token});
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  });

app.get('/api/transactions', authenticateAdmin, async (req, res) => {
    try {
      const transactions = await Transfer.find()
        .populate('fromAccount', 'name accountNumber') // Assuming User model has name and accountNumber
        .populate('toAccount', 'name accountNumber'); // Assuming Beneficiary model has name and accountNumber
      res.json(transactions);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch transactions' });
    }
  });

app.get('/api/users', authenticateAdmin, async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  });
  

app.listen(4000, () => {
    console.log('App is listening on 4000');
});

