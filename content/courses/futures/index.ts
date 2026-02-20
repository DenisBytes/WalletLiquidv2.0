import type { ComponentType } from 'react'

import C01 from './01-what-are-futures'
import C02 from './02-perpetual-contracts'
import C03 from './03-long-and-short'
import C04 from './04-leverage'
import C05 from './05-margin'
import C06 from './06-liquidation'
import C07 from './07-pnl-calculation'
import C08 from './08-funding-rates'
import C09 from './09-risk-management'
import C10 from './10-trading-strategies'

export const futuresContent: Record<string, ComponentType> = {
  '01-what-are-futures': C01,
  '02-perpetual-contracts': C02,
  '03-long-and-short': C03,
  '04-leverage': C04,
  '05-margin': C05,
  '06-liquidation': C06,
  '07-pnl-calculation': C07,
  '08-funding-rates': C08,
  '09-risk-management': C09,
  '10-trading-strategies': C10,
}
