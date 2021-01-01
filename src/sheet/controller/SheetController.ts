import Sheet, { RowType } from "../shared/Sheet";

export default class SheetController {

    // 接続確認
    connectionCheck = (): string => {
        console.log('aaaa')

        const sheet = new Sheet()
        const row: RowType = { name: 'name', email: 'hoge.com'}
        const message = sheet.update(row)
        console.log(message)

        return "connectionCheck"
    }

}
