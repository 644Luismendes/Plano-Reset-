import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
 https://ytzyvzqhdyylpkmbtfbm.supabase.co
  sb_publishable_PJ7FYtDdX6wQFCTP65ABcQ_8nYkk3Y5
)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' })
  }

  const data = req.body

  console.log("Webhook recebido:", data)

  const email = data?.customer?.email || data?.email

  if (data.status === 'paid' && email) {
    const { error } = await supabase
      .from('users')
      .upsert({
        email: email,
        plan: 'premium',
        credits: 999999
      })

    if (error) {
      console.log("Erro:", error)
    } else {
      console.log("Usuário liberado:", email)
    }
  }

  return res.status(200).json({ ok: true })
}
