import { createSelector } from "reselect"

const selectGoods = createSelector([state => state.goods], (goods) => goods)
export default selectGoods