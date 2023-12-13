import Jwt from "jsonwebtoken";

const sendCookie = (user, res, message, statusCode = 200) => {
  // here we are generating the cookie for the created user
  const TOKEN = Jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  // checking the status for the cookie
  console.log(TOKEN);

  // when user is created we will send a cookie successfully
  res
    .status(statusCode)
    .cookie("token", TOKEN, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
      // given below two properties will not work in postman this is only for hosting the api
      // samesite means strict mode and both frontend and backend url are to be same
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    .json({
      success: true,
      message,
    });
};

export default sendCookie;
