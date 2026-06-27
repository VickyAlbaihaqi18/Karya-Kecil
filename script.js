// === script.js ===

// --- 1. Logika Validasi Login ---
const formLogin = document.getElementById('formLogin');
if (formLogin) {
    formLogin.addEventListener('submit', function(event) {
        event.preventDefault(); 
        const user = document.getElementById('username').value.trim();
        const pass = document.getElementById('password').value.trim();

        if (user === '' || pass === '') {
            alert('Peringatan: Username dan Password tidak boleh kosong!');
        } else {
            alert('Berhasil Login! Selamat datang, ' + user + '.');
            window.location.href = 'home-060.html'; 
        }
    });
}

// --- 2. Logika Halaman Transaksi (Harga Transparan) ---
const formTransaksi = document.getElementById('formTransaksi');
const selectMobil = document.getElementById('jenisMobil');
const inputDurasi = document.getElementById('lamaSewa');
const tampilHarga = document.getElementById('totalHargaTampil');

if (formTransaksi) {
    let nomorTransaksi = 1;

    // Fungsi Format Rupiah
    const formatRupiah = (angka) => {
        return new Intl.NumberFormat('id-ID', { 
            style: 'currency', 
            currency: 'IDR', 
            minimumFractionDigits: 0 
        }).format(angka);
    };

    // Fungsi Kalkulasi Otomatis
    const kalkulasiHarga = () => {
        const harga = parseInt(selectMobil.value) || 0;
        const durasi = parseInt(inputDurasi.value) || 0;
        const total = harga * durasi;
        tampilHarga.value = formatRupiah(total);
    };

    // Trigger kalkulasi saat input diubah
    selectMobil.addEventListener('change', kalkulasiHarga);
    inputDurasi.addEventListener('input', kalkulasiHarga);

    // Proses Submit Transaksi
    formTransaksi.addEventListener('submit', function(event) {
        event.preventDefault(); 

        const nama = document.getElementById('namaPenyewa').value.trim();
        const durasi = parseInt(inputDurasi.value) || 0;
        const harga = parseInt(selectMobil.value) || 0;
        const namaMobil = selectMobil.options[selectMobil.selectedIndex].getAttribute('data-nama');

        if (nama === '' || !harga || !durasi) {
            alert('Mohon lengkapi semua data transaksi dengan benar!');
            return;
        }

        const totalBiaya = harga * durasi;
        const tbody = document.getElementById('dataTransaksi');
        const tr = document.createElement('tr');
        
        tr.innerHTML = `
            <td>${nomorTransaksi}</td>
            <td><strong>${nama}</strong></td>
            <td>${namaMobil}</td>
            <td>${durasi} Hari</td>
            <td style="color: #198754; font-weight: bold;">${formatRupiah(totalBiaya)}</td>
        `;

        tbody.appendChild(tr);
        nomorTransaksi++;

        alert('Data transaksi sukses ditambahkan!');
        
        this.reset();
        tampilHarga.value = 'Rp 0';
    });
}