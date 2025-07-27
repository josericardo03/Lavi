// test-connection.js
const { Client } = require("pg");

async function testConnection() {
  const client = new Client({
    host: "aws-0-sa-east-1.pooler.supabase.com",
    port: 5432,
    database: "postgres",
    user: "postgres.hmyaypcndhexkbpiuwfm",
    password: "Jj201348@",
    ssl: {
      rejectUnauthorized: false,
    },
  });

  try {
    await client.connect();
    console.log("✅ Conexão bem-sucedida!");

    const result = await client.query("SELECT NOW()");
    console.log("Hora do servidor:", result.rows[0].now);

    await client.end();
  } catch (error) {
    console.error("❌ Erro na conexão:", error.message);
  }
}

testConnection();
