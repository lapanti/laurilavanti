import { artificialIntelligenceTag } from './tags/artificial-intelligence'
import { basicWelfareTag } from './tags/basic-welfare'
import { coopElectionsTag } from './tags/coop-elections'
import { councilMotionTag } from './tags/council-motion'
import { cultureAndEducationTag } from './tags/culture-and-education'
import { digitalIndependenceTag } from './tags/digital-independence'
import { digitalisationTag } from './tags/digitalisation'
import { earlyChildhoodEducationTag } from './tags/early-childhood-education'
import { educationTag } from './tags/education'
import { equalityAndNonDiscriminationTag } from './tags/equality-and-non-discrimination'
import { healthAndSocialReformTag } from './tags/health-and-social-reform'
import { immigrationTag } from './tags/immigration'
import { infrastructureTag } from './tags/infrastructure'
import { kirkkonummiTag } from './tags/kirkkonummi'
import { municipalElections2025Tag } from './tags/municipal-elections-2025'
import { natureTag } from './tags/nature'
import { privacyTag } from './tags/privacy'
import { regionalElections2022Tag } from './tags/regional-elections-2022'
import { regionalElections2025Tag } from './tags/regional-elections-2025'
import { socialMediaTag } from './tags/social-media'
import { technologyTag } from './tags/technology'
import { transportationTag } from './tags/transportation'
import { urbanPlanningTag } from './tags/urban-planning'
import { westRailwayTag } from './tags/west-railway'
import { westernUusimaaTag } from './tags/western-uusimaa'

export type { LocalTag } from './tags/types'

export const tags = [
    regionalElections2022Tag,
    regionalElections2025Tag,
    digitalIndependenceTag,
    digitalisationTag,
    infrastructureTag,
    urbanPlanningTag,
    kirkkonummiTag,
    municipalElections2025Tag,
    westRailwayTag,
    westernUusimaaTag,
    transportationTag,
    immigrationTag,
    educationTag,
    coopElectionsTag,
    basicWelfareTag,
    cultureAndEducationTag,
    socialMediaTag,
    healthAndSocialReformTag,
    equalityAndNonDiscriminationTag,
    technologyTag,
    artificialIntelligenceTag,
    councilMotionTag,
    earlyChildhoodEducationTag,
    privacyTag,
    natureTag,
]

export function getTagName(id: string, lang: 'en' | 'fi' | 'sv' = 'fi'): string | undefined {
    return tags.find((t) => t.id === id)?.names[lang]
}
