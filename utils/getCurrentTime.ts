export const getCurrentTime = () => {
    // Mendapatkan waktu saat ini dalam UTC
    const now = new Date();

    // Menghitung pergeseran waktu ke GMT+7
    const utcTime = now.getTime() + (now.getTimezoneOffset() * 60000);
    const gmt7Time = new Date(utcTime + (7 * 3600000));

    // Membentuk tanggal dalam format YYYY-MM-DD
    const year = gmt7Time.getFullYear();
    const month = String(gmt7Time.getMonth() + 1).padStart(2, '0');
    const day = String(gmt7Time.getDate()).padStart(2, '0');

    // Membentuk waktu dalam format HH:MM:SS
    const hours = String(gmt7Time.getHours()).padStart(2, '0');
    const minutes = String(gmt7Time.getMinutes()).padStart(2, '0');
    const seconds = String(gmt7Time.getSeconds()).padStart(2, '0');

    // Menggabungkan offset zona waktu
    const timezoneOffset = '+0700';

    // Menggabungkan semuanya
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds} ${timezoneOffset}`;
}