let fetch = require('node-fetch')
let { MessageType } = require('@adiwajshing/baileys')
let handler = async(m, { conn }) => {
    let kontol = `
╭═════〘 قــوانــين 〙═══
⬡ 🕷️*قد يؤدي سبام البوت للحصول على منع مبؤد من البوت* 
⬡ 🕷️*الاتصال قد يؤدي إلى الحظر احيانا*
⬡ 🕷️*الحصول على العضوية عندة ممزات عدة* 
⬡ 🕷️*لا يسمح بتاتا التحدث مع المطور في شؤون خاصة أو غير ضرورية*
⬡ 🕷️*لا يسمح للمستخدم استغلال البوت دون ملكية العضوية*
⬡ 🕷️*من شروط البوت الاشتراك في انستغرام المطور*
⬡ 🕷️*يرجى الانضمام للنقابة للحصول على عضوية مقؤتة*
╰═════════════════════════
╠════════════════════════
║╭────❉ 「 ســوشــيل مــيديــا 」 ❉─────
║│ ❍ *انستغرامي*          :
║│ instagram.com/_kopz__
║│ ❍ *تيك توك*                   :
║│ tiktok.com/@1pjr
║╰──────────────────
╠════════════════════════
║╭─────────────────
║│ ©C++ ${namabot}
║│ طور من طرف يحــيى
║╰──────────────────
╠════════════════════════
║╭─────────────────
║│ ©2022
║╰──────────────────
╰═════〘 ${namabot} 〙 ═
	
	
	
	
	`.trim()
  const button = {
        buttonText: 'Klik Disini',
        description: kontol,
        sections:  [{title: "Silahkan di pilih gausah pilih yang gaada", rows: [
        {title: 'Menu Utama', description: "Kembali ke Menu Utama", rowId:".?"},
        {title: 'Sewa Bot', description: "Sewa bot dengan memasukkan bot ke grup kamu", rowId:".sewa"},
        {title: 'Cara Invit?', description: "Cara Memasukkan Bot Di GC", rowId:".donasi"},
        {title: 'Nomor Owner', description: "CHAT BAGI YANG KEPENTINGAN", rowId:".owner"},
       ] }],
        listType: 1
       }
    conn.sendMessage(m.chat, button, MessageType.listMessage, { quoted: m })
}

handler.tags = ['main', 'update']
handler.command = /^(rules|rule)$/i
handler.help = ['rules']
module.exports = handler
