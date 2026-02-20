import type { ComponentType } from 'react'

import C01 from './01-what-are-options'
import C02 from './02-calls-and-puts'
import C03 from './03-option-pricing'
import C04 from './04-intrinsic-and-time-value'
import C05 from './05-the-greeks-overview'
import C06 from './06-delta'
import C07 from './07-gamma'
import C08 from './08-theta'
import C09 from './09-vega'
import C10 from './10-implied-volatility'
import C11 from './11-buying-calls'
import C12 from './12-buying-puts'
import C13 from './13-selling-calls'
import C14 from './14-selling-puts'
import C15 from './15-covered-calls'
import C16 from './16-protective-puts'
import C17 from './17-option-spreads'
import C18 from './18-straddles-and-strangles'
import C19 from './19-risk-management'
import C20 from './20-putting-it-together'

export const optionsContent: Record<string, ComponentType> = {
  '01-what-are-options': C01,
  '02-calls-and-puts': C02,
  '03-option-pricing': C03,
  '04-intrinsic-and-time-value': C04,
  '05-the-greeks-overview': C05,
  '06-delta': C06,
  '07-gamma': C07,
  '08-theta': C08,
  '09-vega': C09,
  '10-implied-volatility': C10,
  '11-buying-calls': C11,
  '12-buying-puts': C12,
  '13-selling-calls': C13,
  '14-selling-puts': C14,
  '15-covered-calls': C15,
  '16-protective-puts': C16,
  '17-option-spreads': C17,
  '18-straddles-and-strangles': C18,
  '19-risk-management': C19,
  '20-putting-it-together': C20,
}
