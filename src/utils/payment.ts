// utils/payment.ts
const crc16 = (str: string): string => {
    let crc = 0xFFFF;
    for (let i = 0; i < str.length; i++) {
        crc ^= str.charCodeAt(i) << 8;
        for (let j = 0; j < 8; j++) {
            if (crc & 0x8000) {
                crc = (crc << 1) ^ 0x1021;
            } else {
                crc = crc << 1;
            }
            crc &= 0xFFFF;
        }
    }
    return crc.toString(16).padStart(4, '0').toUpperCase();
};

const generateKHQRPayload = (amount: number): string => {
    const currency = '840'; // USD
    const amountStr = amount.toFixed(2).replace('.', '');
    const amountLength = amountStr.length.toString().padStart(2, '0');

    const merchantName = 'My Shop';
    const merchantNameLength = merchantName.length.toString().padStart(2, '0');

    const merchantCity = 'Phnom Penh';
    const merchantCityLength = merchantCity.length.toString().padStart(2, '0');

    const merchantAccountInfo = '2918A000000677010111'; // Bakong GUID

    const payloadParts = [
        '000201', // Payload Format Indicator
        '010211', // Point of Initiation Method (Static)
        merchantAccountInfo,
        `5303${currency}`, // Transaction Currency
        `54${amountLength}${amountStr}`, // Transaction Amount
        '5802KH', // Country Code
        `59${merchantNameLength}${merchantName}`, // Merchant Name
        `60${merchantCityLength}${merchantCity}`, // Merchant City
        '6304' // CRC Length
    ];

    const payloadWithoutCrcValue = payloadParts.slice(0, -1).join('') + '6304';
    const crcValue = crc16(payloadWithoutCrcValue);
    return payloadWithoutCrcValue + crcValue;
};

export { crc16, generateKHQRPayload };