db.createUser(
    {
        user: "xxxx",
        pwd: "xxxxxx",
        roles: [
            {
                role: "readWrite",
                db: "xxxx"
            }
        ]
    }
)