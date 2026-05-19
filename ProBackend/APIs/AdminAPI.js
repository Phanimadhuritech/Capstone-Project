import exp from 'express'
import { UserModel } from '../models/UserModel.js'
import { verifyToken } from '../middlewares/VerifyToken.js'

export const adminApp=exp.Router()

adminApp.get('/users', verifyToken('ADMIN'), async (req, res, next) => {
  try {
    const users = await UserModel.find({}, { password: 0 }).sort({ createdAt: -1 })
    res.status(200).json({ message: 'Users fetched', payload: users })
  } catch (err) {
    next(err)
  }
})

adminApp.patch('/users', verifyToken('ADMIN'), async (req, res, next) => {
  try {
    const { userId, isUserActive } = req.body

    if (!userId || typeof isUserActive !== 'boolean') {
      return res.status(400).json({ message: 'userId and isUserActive are required' })
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { isUserActive },
      { new: true, runValidators: true, projection: { password: 0 } },
    )

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.status(200).json({ message: 'User status updated', payload: updatedUser })
  } catch (err) {
    next(err)
  }
})
