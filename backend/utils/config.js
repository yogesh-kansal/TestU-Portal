module.exports={
    secretKey: process.env.SECRETKEY || '12344321',
    refreshKey: process.env.REFRESHKEY || '1234567789',
    genKey:process.env.GENKEY || '121212121211',
    dburl: process.env.DBURL || 'mongodb://localhost:27017/project2',
    baseUrl: process.env.BACKENDURL || 'http://localhost:3001',
    clientUrl: process.env.FRONTENDURL || 'http://localhost:3000',
    PORT: process.env.PORT || 3001,
    EMAIL: process.env.EMAIL || '',
    PASS: process.env.PASS || ''
};