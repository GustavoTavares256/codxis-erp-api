import bcrypt from 'bcryptjs'

async function generateHash() {
  const password = 'Codexis1020'

  const hash = await bcrypt.hash(password, 10)

  console.log('\nSenha:', password)
  console.log('Hash:', hash)
}

generateHash()