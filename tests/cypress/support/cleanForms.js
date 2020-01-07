db.users.remove( { displayName: { $eq: 'test' } }, true )
db.customers.remove( { name: { $eq: 'Test' } }, true )
