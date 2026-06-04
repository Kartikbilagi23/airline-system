require('dotenv').config();
const app=require('./src/App')

const PORT =process.env.PORT||5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on ${PORT}`);
});