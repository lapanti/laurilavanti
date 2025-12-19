import type { LocaleCode } from "contentful";
import type { TypeFooterNav, TypeMainNav, TypePage, TypePost } from "./contentfulCodegen";

export type LC = LocaleCode
export type WITH_LINKS = 'WITHOUT_LINK_RESOLUTION'
export type WITH_ENTRIES = 'WITHOUT_UNRESOLVABLE_LINKS'

export type FooterNav = TypeFooterNav<WITH_ENTRIES, LC>

export type MainNav = TypeMainNav<WITH_ENTRIES, LC>

export type Page = TypePage<WITH_ENTRIES, LC>

export type Post = TypePost<WITH_ENTRIES, LC>
