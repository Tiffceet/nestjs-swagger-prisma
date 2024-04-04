export default () => ({
  PORT: parseInt(process.env.PORT, 10) || 8000,
  DATABASE_URL: process.env.DATABASE_URL,
  jwt: {
    accessSecret: process.env.JWT_SECRET,
    accessExpiresIn: process.env.JWT_EXPIRES_IN,
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
  },
  // bcryptSaltOrRounds: parseInt(process.env.BCRYPT_SALT_OR_ROUNDS) || 10,
  // sheets: {
  //   spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID,
  //   privateKey: process.env.SHEETS_API_PRIVATE_KEY,
  // },
  // database: {
  //   host: process.env.DATABASE_HOST,
  //   port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  // },
});
