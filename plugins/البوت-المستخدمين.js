let handler = async (m, { conn }) => {
  let totalreg = Object.keys(global.db.data.users).length;
  let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered === true).length;
  
  let txt = 'قائمة المستخدمين:\n\n';
  let mentions = []; // مصفوفة لتخزين معرّفات المستخدمين للإشارة إليهم
  let counter = 1; // عداد الترقيم
  
  for (let [id, user] of Object.entries(global.db.data.users)) {
    if (id.endsWith('s.whatsapp.net')) {
      let name = '@' + id.split('@')[0];
      let whatsappLink = `https://wa.me/${id.split('@')[0]}`; // إنشاء رابط WhatsApp
      txt += `*رقم:* ${counter}\n*المستخدم:* ${name}\n*المعرف:* ${id}\n*رابط واتساب:* ${whatsappLink}\n\n`;
      mentions.push(id); // إضافة معرّف المستخدم إلى قائمة الإشارات
      counter++; // زيادة عداد الترقيم
    }
  }
  
  // إرسال الرسالة مع إشارات للمستخدمين
  conn.sendMessage(m.chat, { text: txt, mentions: mentions.map(id => id) }, { quoted: m });
};

handler.help = ['database', 'user'];
handler.tags = ['info'];
handler.command = /^(المستخدمين)$/i;
handler.owner = true;

export default handler;
