'use strict';

// 要素の取得
const textInput = document.getElementById('text-input');
const qrcodeElement = document.getElementById('qrcode');
const downloadButton = document.getElementById('download-button');
// qrcode.jsライブラリの機能を使ってQRコードを描画するためのオブジェクトを生成
const qrcode = new QRCode(
    qrcodeElement,  // 生成したQRコード画像を埋め込む要素
    {
        width: 200,  // 生成するQRコード画像の横幅の設定
        height: 200,  // 生成するQRコード画像の高さの設定
        colorDark: '#000000',  // 黒い部分の色の設定
        colorLight: '#ffffff',  // 背景色の設定
        correctLevel: QRCode.CorrectLevel.H  // 誤り訂正レベルの設定（Hは最高，少し汚れても読める設定）
    }
);
// テキストボックスの入力内容が変化した場合の処理
textInput.addEventListener('input', e => {
    const value = e.target.value;  // テキストボックスの入力内容を取得
    
    if (value.trim() === '') {
        qrcode.clear(); // 入力が空なら内部的な描画状態をリセット
        qrcodeElement.style.display = 'none';  // QRコード画像の表示エリアを非表示
        downloadButton.style.display = 'none';  // ダウンロードボタンを非表示
    } else {
        qrcode.makeCode(value); // QRコード生成
        qrcodeElement.style.display = 'block';  // QRコード画像の表示エリアを表示
        downloadButton.style.display = 'inline-block';  // ダウンロードボタンを表示
    }
});
// ダウンロードボタンがクリックされた場合
downloadButton.addEventListener('click', () => {
    // qrcode.jsで生成されたQRコードの画像（img要素）を取得
    const img = qrcodeElement.querySelector('#qrcode img');
    
    if (img) {  // もしimg要素が取得できれば
        // 擬似的にリンクを作成してクリックさせる
        const link = document.createElement('a');
        link.href = img.src;
        link.download = 'qrcode.png';
        link.click();
    }
});