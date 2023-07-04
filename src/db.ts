import pgPromise from 'pg-promise';

const pgp = pgPromise();

const connectionOptions = {
  connectionString: 'postgres://egbenalp:GJnrp6cziUuxAHmkAZc7ZP9LnaC8qpkx@stampy.db.elephantsql.com/egbenalp',
};

const db = pgp(connectionOptions);

export default db;
