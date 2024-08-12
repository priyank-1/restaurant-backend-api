#!/bin/bash

mongo -- "$MONGO_INITDB_DATABASE" <<EOF
    db.createUser({
    user: "$MONGO_USERNAME"
    pwd : "$MONGO_PASSWORD",
    roles:[
    {
        role : 'readWrite' , db : "$MONGO_INTIDB_DATABASE"
    }]
    });
EOF    