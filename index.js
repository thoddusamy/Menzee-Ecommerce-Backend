const express = require("express")
const app = express()
const cors = require("cors")
const ConnectDB = require("./Config/ConnectDB")
require("dotenv").config()
require("colors")
const port = 4000
const RegisterRoute = require('./Routes/registerRoute')
const LoginRoute = require('./Routes/loginRoute')
const OTPRoute = require('./Routes/OTPRoute')
const SendCheckLinkRoute = require('./Routes/send&CheckLinkRoute')
const ResetPassRoute = require('./Routes/resetPassRoute')
const UserRoute = require('./Routes/userRoute')
const ProductsRoute = require('./Routes/productsRoute')
const CartRoute = require('./Routes/cartRoute')
const AddressRoute = require('./Routes/addressRoute')
const OrdersRoute = require('./Routes/ordersRoute')
const PaymentRoute = require('./Routes/paymentRoute')
const WishlistRoute = require('./Routes/wishlistRoute')
const AdminRoute = require('./Routes/adminRoute')

ConnectDB()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send("Server Is Working Pretty!!!")
})

app.use('/register', RegisterRoute)
app.use('/login', LoginRoute)
app.use('/verifyotp', OTPRoute)
app.use('/removeotp', OTPRoute)
app.use('/sendresetlink', SendCheckLinkRoute)
app.use('/resetpassword', ResetPassRoute)
app.use('/user', UserRoute)
app.use('/products', ProductsRoute)
app.use('/cart', CartRoute)
app.use('/wishlist', WishlistRoute)
app.use('/address', AddressRoute)
app.use('/orders', OrdersRoute)
app.use('/payment', PaymentRoute)
app.use('/admin', AdminRoute)


app.listen(process.env.PORT || port, () => console.log(`Server is running at ${port}`.yellow.underline))
