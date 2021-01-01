require('dotenv').config()

const { GoogleSpreadsheet } = require('google-spreadsheet');
// GCP SheetsAPI 認証JSON
const credentials = require('../credentials.json');

export type RowType = {
	name: string
	email: string
}

export default class Sheet {
	update = async(row: RowType) => {
		try {

			const SPREADSHEET_ID = process.env.SPREADSHEET_ID || ''
			const WORKSHEET_ID = process.env.WORKSHEET_ID || ''

			console.log(SPREADSHEET_ID)

			const doc = new GoogleSpreadsheet(SPREADSHEET_ID);
			await doc.useServiceAccountAuth(credentials);
			await doc.loadInfo();

			console.log(doc.title)

			// シート特定
			const sheet = await doc.sheetsById[WORKSHEET_ID]
			// 書き込み
			sheet.addRow(row);

		} catch (error) {
			console.error('--------💣 エラー発生---------', error)
			return 'error'
		}

		return 'success'
	}
}

// デバッグ用
const testRow: RowType = { name: 'name', email: 'sample.com'}
const sheet = new Sheet()
sheet.update(testRow)
