import type { Asset, LocaleCode } from 'contentful'
import type { TypeCurriculumVitae, TypeFooterNav, TypeMainNav, TypePage, TypePost } from './contentfulCodegen'

export type LC = LocaleCode
export type WITH_LINKS = 'WITHOUT_LINK_RESOLUTION'
export type WITH_ENTRIES = 'WITHOUT_UNRESOLVABLE_LINKS'

export type FooterNav = { contentTypeId: 'footerNav' } & TypeFooterNav<WITH_ENTRIES, LC>

export type MainNav = { contentTypeId: 'mainNav' } & TypeMainNav<WITH_ENTRIES, LC>

export type Page = { contentTypeId: 'page' } & TypePage<WITH_ENTRIES, LC>

export type Post = { contentTypeId: 'post' } & TypePost<WITH_ENTRIES, LC>

export type Image = Asset<WITH_ENTRIES, LC>

export type CurriculumVitae = { contentTypeId: 'curriculumVitae' } & TypeCurriculumVitae<WITH_ENTRIES, LC>
