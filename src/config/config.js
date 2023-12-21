const config = {
	PORT: 8000,
	body_parser: { extended: false },
	session: {
		secret: "qwertyyy",
		resave: false,
		saveUninitialized: true,
		cookie: { maxAge: 60000 },
	}
};

module.exports = config;
