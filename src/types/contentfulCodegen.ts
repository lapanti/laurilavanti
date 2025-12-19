import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

/**
 * Fields type definition for content type 'TypeContactInfo'
 * @name TypeContactInfoFields
 * @type {TypeContactInfoFields}
 * @memberof TypeContactInfo
 */
export interface TypeContactInfoFields {

    /**
     * Field type definition for field 'titleToBeIgnored' (Title to be ignored)
     * @name Title to be ignored
     * @localized false
     */
    titleToBeIgnored: EntryFieldTypes.Symbol<"Contact info">;

    /**
     * Field type definition for field 'links' (Links)
     * @name Links
     * @localized false
     */
    links?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeContactInfoLinkSkeleton>>;
}

/**
 * Entry skeleton type definition for content type 'contactInfo' (📇 Contact info)
 * @name TypeContactInfoSkeleton
 * @type {TypeContactInfoSkeleton}
 * @author 0gveB6TBChXdFEnRDwWnyH
 * @since 2022-06-19T18:24:19.260Z
 * @version 13
 */
export type TypeContactInfoSkeleton = EntrySkeletonType<TypeContactInfoFields, "contactInfo">;

/**
 * Entry type definition for content type 'contactInfo' (📇 Contact info)
 * @name TypeContactInfo
 * @type {TypeContactInfo}
 * @author Lauri Lavanti<laurilavanti@gmail.com>
 * @since 2022-06-19T18:24:19.260Z
 * @version 13
 * @link https://app.contentful.com/spaces/44t6u1r4zgqq/environments/main/content_types/contactInfo
 */
export type TypeContactInfo<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeContactInfoSkeleton, Modifiers, Locales>;

/**
 * Fields type definition for content type 'TypeContactInfoLink'
 * @name TypeContactInfoLinkFields
 * @type {TypeContactInfoLinkFields}
 * @memberof TypeContactInfoLink
 */
export interface TypeContactInfoLinkFields {

    /**
     * Field type definition for field 'title' (Title)
     * @name Title
     * @localized true
     */
    title: EntryFieldTypes.Symbol;

    /**
     * Field type definition for field 'icon' (Icon)
     * @name Icon
     * @localized false
     */
    icon: EntryFieldTypes.Symbol<"bluesky" | "envelope" | "facebook" | "instagram" | "linkedin" | "mastodon" | "threads" | "tiktok" | "twitter">;

    /**
     * Field type definition for field 'url' (URL)
     * @name URL
     * @localized false
     */
    url: EntryFieldTypes.Symbol;

    /**
     * Field type definition for field 'username' (Username)
     * @name Username
     * @localized false
     */
    username: EntryFieldTypes.Symbol;
}

/**
 * Entry skeleton type definition for content type 'contactInfoLink' (🔗 Contact info link)
 * @name TypeContactInfoLinkSkeleton
 * @type {TypeContactInfoLinkSkeleton}
 * @author 0gveB6TBChXdFEnRDwWnyH
 * @since 2022-06-21T07:14:27.940Z
 * @version 15
 */
export type TypeContactInfoLinkSkeleton = EntrySkeletonType<TypeContactInfoLinkFields, "contactInfoLink">;

/**
 * Entry type definition for content type 'contactInfoLink' (🔗 Contact info link)
 * @name TypeContactInfoLink
 * @type {TypeContactInfoLink}
 * @author Lauri Lavanti<laurilavanti@gmail.com>
 * @since 2022-06-21T07:14:27.940Z
 * @version 15
 * @link https://app.contentful.com/spaces/44t6u1r4zgqq/environments/main/content_types/contactInfoLink
 */
export type TypeContactInfoLink<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeContactInfoLinkSkeleton, Modifiers, Locales>;

/**
 * Fields type definition for content type 'TypeCurriculumVitae'
 * @name TypeCurriculumVitaeFields
 * @type {TypeCurriculumVitaeFields}
 * @memberof TypeCurriculumVitae
 */
export interface TypeCurriculumVitaeFields {

    /**
     * Field type definition for field 'internalName' (Internal name)
     * @name Internal name
     * @localized false
     */
    internalName: EntryFieldTypes.Symbol;

    /**
     * Field type definition for field 'fiduciariesTitle' (Fiduciaries title)
     * @name Fiduciaries title
     * @localized true
     */
    fiduciariesTitle: EntryFieldTypes.Symbol;

    /**
     * Field type definition for field 'fiduciaries' (Fiduciaries)
     * @name Fiduciaries
     * @localized false
     */
    fiduciaries?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeFiduciariesSkeleton>>;

    /**
     * Field type definition for field 'jobExperiencesTitle' (Job experiences title)
     * @name Job experiences title
     * @localized true
     */
    jobExperiencesTitle: EntryFieldTypes.Symbol;

    /**
     * Field type definition for field 'jobExperiences' (Job experiences)
     * @name Job experiences
     * @localized false
     */
    jobExperiences?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeJobExperienceSkeleton>>;

    /**
     * Field type definition for field 'degreesTitle' (Degrees title)
     * @name Degrees title
     * @localized true
     */
    degreesTitle: EntryFieldTypes.Symbol;

    /**
     * Field type definition for field 'degrees' (Degrees)
     * @name Degrees
     * @localized false
     */
    degrees?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeEducationSkeleton>>;
}

/**
 * Entry skeleton type definition for content type 'curriculumVitae' (🗃️ Curriculum Vitae)
 * @name TypeCurriculumVitaeSkeleton
 * @type {TypeCurriculumVitaeSkeleton}
 * @author 0gveB6TBChXdFEnRDwWnyH
 * @since 2023-10-16T06:38:18.079Z
 * @version 3
 */
export type TypeCurriculumVitaeSkeleton = EntrySkeletonType<TypeCurriculumVitaeFields, "curriculumVitae">;

/**
 * Entry type definition for content type 'curriculumVitae' (🗃️ Curriculum Vitae)
 * @name TypeCurriculumVitae
 * @type {TypeCurriculumVitae}
 * @author Lauri Lavanti<laurilavanti@gmail.com>
 * @since 2023-10-16T06:38:18.079Z
 * @version 3
 * @link https://app.contentful.com/spaces/44t6u1r4zgqq/environments/main/content_types/curriculumVitae
 */
export type TypeCurriculumVitae<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeCurriculumVitaeSkeleton, Modifiers, Locales>;

/**
 * Fields type definition for content type 'TypeEducation'
 * @name TypeEducationFields
 * @type {TypeEducationFields}
 * @memberof TypeEducation
 */
export interface TypeEducationFields {

    /**
     * Field type definition for field 'internalName' (Internal name)
     * @name Internal name
     * @localized false
     */
    internalName: EntryFieldTypes.Symbol;

    /**
     * Field type definition for field 'school' (School)
     * @name School
     * @localized false
     */
    school: EntryFieldTypes.Symbol;

    /**
     * Field type definition for field 'location' (Location)
     * @name Location
     * @localized false
     */
    location: EntryFieldTypes.Symbol;

    /**
     * Field type definition for field 'degree' (Degree)
     * @name Degree
     * @localized false
     */
    degree: EntryFieldTypes.Symbol;

    /**
     * Field type definition for field 'startYear' (Start year)
     * @name Start year
     * @localized false
     */
    startYear: EntryFieldTypes.Integer;

    /**
     * Field type definition for field 'endYear' (End year)
     * @name End year
     * @localized false
     */
    endYear?: EntryFieldTypes.Integer;
}

/**
 * Entry skeleton type definition for content type 'education' (🎫 Education)
 * @name TypeEducationSkeleton
 * @type {TypeEducationSkeleton}
 * @author 0gveB6TBChXdFEnRDwWnyH
 * @since 2023-10-16T03:58:12.146Z
 * @version 11
 */
export type TypeEducationSkeleton = EntrySkeletonType<TypeEducationFields, "education">;

/**
 * Entry type definition for content type 'education' (🎫 Education)
 * @name TypeEducation
 * @type {TypeEducation}
 * @author Lauri Lavanti<laurilavanti@gmail.com>
 * @since 2023-10-16T03:58:12.146Z
 * @version 11
 * @link https://app.contentful.com/spaces/44t6u1r4zgqq/environments/main/content_types/education
 */
export type TypeEducation<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeEducationSkeleton, Modifiers, Locales>;

/**
 * Fields type definition for content type 'TypeExcerptList'
 * @name TypeExcerptListFields
 * @type {TypeExcerptListFields}
 * @memberof TypeExcerptList
 */
export interface TypeExcerptListFields {

    /**
     * Field type definition for field 'title' (Title)
     * @name Title
     * @localized false
     */
    title: EntryFieldTypes.Symbol;

    /**
     * Field type definition for field 'pinned' (Pinned)
     * @name Pinned
     * @localized false
     */
    pinned?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypePageSkeleton | TypePostSkeleton>>;

    /**
     * Field type definition for field 'limit' (Limit)
     * @name Limit
     * @localized false
     */
    limit?: EntryFieldTypes.Integer;
}

/**
 * Entry skeleton type definition for content type 'excerptList' (🪣 Excerpt List)
 * @name TypeExcerptListSkeleton
 * @type {TypeExcerptListSkeleton}
 * @author 0gveB6TBChXdFEnRDwWnyH
 * @since 2022-06-19T17:36:37.650Z
 * @version 15
 */
export type TypeExcerptListSkeleton = EntrySkeletonType<TypeExcerptListFields, "excerptList">;

/**
 * Entry type definition for content type 'excerptList' (🪣 Excerpt List)
 * @name TypeExcerptList
 * @type {TypeExcerptList}
 * @author Lauri Lavanti<laurilavanti@gmail.com>
 * @since 2022-06-19T17:36:37.650Z
 * @version 15
 * @link https://app.contentful.com/spaces/44t6u1r4zgqq/environments/main/content_types/excerptList
 */
export type TypeExcerptList<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeExcerptListSkeleton, Modifiers, Locales>;

/**
 * Fields type definition for content type 'TypeFiduciaries'
 * @name TypeFiduciariesFields
 * @type {TypeFiduciariesFields}
 * @memberof TypeFiduciaries
 */
export interface TypeFiduciariesFields {

    /**
     * Field type definition for field 'internalName' (Internal name)
     * @name Internal name
     * @localized false
     */
    internalName: EntryFieldTypes.Symbol;

    /**
     * Field type definition for field 'organization' (Organization)
     * @name Organization
     * @localized false
     */
    organization: EntryFieldTypes.Symbol;

    /**
     * Field type definition for field 'duty' (Duty)
     * @name Duty
     * @localized false
     */
    duty: EntryFieldTypes.Symbol;

    /**
     * Field type definition for field 'startYear' (Start year)
     * @name Start year
     * @localized false
     */
    startYear: EntryFieldTypes.Integer;

    /**
     * Field type definition for field 'endYear' (End year)
     * @name End year
     * @localized false
     */
    endYear?: EntryFieldTypes.Integer;
}

/**
 * Entry skeleton type definition for content type 'fiduciaries' (🎫 Fiduciary)
 * @name TypeFiduciariesSkeleton
 * @type {TypeFiduciariesSkeleton}
 * @author 0gveB6TBChXdFEnRDwWnyH
 * @since 2023-10-16T03:57:49.422Z
 * @version 11
 */
export type TypeFiduciariesSkeleton = EntrySkeletonType<TypeFiduciariesFields, "fiduciaries">;

/**
 * Entry type definition for content type 'fiduciaries' (🎫 Fiduciary)
 * @name TypeFiduciaries
 * @type {TypeFiduciaries}
 * @author Lauri Lavanti<laurilavanti@gmail.com>
 * @since 2023-10-16T03:57:49.422Z
 * @version 11
 * @link https://app.contentful.com/spaces/44t6u1r4zgqq/environments/main/content_types/fiduciaries
 */
export type TypeFiduciaries<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeFiduciariesSkeleton, Modifiers, Locales>;

/**
 * Fields type definition for content type 'TypeFooterLink'
 * @name TypeFooterLinkFields
 * @type {TypeFooterLinkFields}
 * @memberof TypeFooterLink
 */
export interface TypeFooterLinkFields {

    /**
     * Field type definition for field 'title' (Title)
     * @name Title
     * @localized true
     */
    title: EntryFieldTypes.Symbol;

    /**
     * Field type definition for field 'url' (URL)
     * @name URL
     * @localized false
     */
    url: EntryFieldTypes.Symbol;

    /**
     * Field type definition for field 'icon' (Icon)
     * @name Icon
     * @localized false
     */
    icon?: EntryFieldTypes.Symbol<"bluesky" | "facebook" | "instagram" | "linkedin" | "mastodon" | "threads" | "twitter">;
}

/**
 * Entry skeleton type definition for content type 'footerLink' (🔗 Footer link)
 * @name TypeFooterLinkSkeleton
 * @type {TypeFooterLinkSkeleton}
 * @author 0gveB6TBChXdFEnRDwWnyH
 * @since 2022-06-21T05:37:26.042Z
 * @version 9
 */
export type TypeFooterLinkSkeleton = EntrySkeletonType<TypeFooterLinkFields, "footerLink">;

/**
 * Entry type definition for content type 'footerLink' (🔗 Footer link)
 * @name TypeFooterLink
 * @type {TypeFooterLink}
 * @author Lauri Lavanti<laurilavanti@gmail.com>
 * @since 2022-06-21T05:37:26.042Z
 * @version 9
 * @link https://app.contentful.com/spaces/44t6u1r4zgqq/environments/main/content_types/footerLink
 */
export type TypeFooterLink<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeFooterLinkSkeleton, Modifiers, Locales>;

/**
 * Fields type definition for content type 'TypeFooterNav'
 * @name TypeFooterNavFields
 * @type {TypeFooterNavFields}
 * @memberof TypeFooterNav
 */
export interface TypeFooterNavFields {

    /**
     * Field type definition for field 'titleToBeIgnored' (Title to be ignored)
     * @name Title to be ignored
     * @localized false
     */
    titleToBeIgnored: EntryFieldTypes.Symbol<"Footer nav">;

    /**
     * Field type definition for field 'links' (Links)
     * @name Links
     * @localized false
     */
    links: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeContactInfoLinkSkeleton | TypeFooterLinkSkeleton>>;
}

/**
 * Entry skeleton type definition for content type 'footerNav' (🍔 Footer nav)
 * @name TypeFooterNavSkeleton
 * @type {TypeFooterNavSkeleton}
 * @author 0gveB6TBChXdFEnRDwWnyH
 * @since 2022-06-21T05:38:25.011Z
 * @version 7
 */
export type TypeFooterNavSkeleton = EntrySkeletonType<TypeFooterNavFields, "footerNav">;

/**
 * Entry type definition for content type 'footerNav' (🍔 Footer nav)
 * @name TypeFooterNav
 * @type {TypeFooterNav}
 * @author Lauri Lavanti<laurilavanti@gmail.com>
 * @since 2022-06-21T05:38:25.011Z
 * @version 7
 * @link https://app.contentful.com/spaces/44t6u1r4zgqq/environments/main/content_types/footerNav
 */
export type TypeFooterNav<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeFooterNavSkeleton, Modifiers, Locales>;

/**
 * Fields type definition for content type 'TypeHomeTitle'
 * @name TypeHomeTitleFields
 * @type {TypeHomeTitleFields}
 * @memberof TypeHomeTitle
 */
export interface TypeHomeTitleFields {

    /**
     * Field type definition for field 'titleToBeIgnored' (Title to be ignored)
     * @name Title to be ignored
     * @localized false
     */
    titleToBeIgnored: EntryFieldTypes.Symbol<"Home title">;

    /**
     * Field type definition for field 'empty' (Empty)
     * @name Empty
     * @localized false
     */
    empty?: EntryFieldTypes.Boolean;
}

/**
 * Entry skeleton type definition for content type 'homeTitle' (🏠 Home title)
 * @name TypeHomeTitleSkeleton
 * @type {TypeHomeTitleSkeleton}
 * @author 0gveB6TBChXdFEnRDwWnyH
 * @since 2022-06-19T18:24:00.934Z
 * @version 7
 */
export type TypeHomeTitleSkeleton = EntrySkeletonType<TypeHomeTitleFields, "homeTitle">;

/**
 * Entry type definition for content type 'homeTitle' (🏠 Home title)
 * @name TypeHomeTitle
 * @type {TypeHomeTitle}
 * @author Lauri Lavanti<laurilavanti@gmail.com>
 * @since 2022-06-19T18:24:00.934Z
 * @version 7
 * @link https://app.contentful.com/spaces/44t6u1r4zgqq/environments/main/content_types/homeTitle
 */
export type TypeHomeTitle<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeHomeTitleSkeleton, Modifiers, Locales>;

/**
 * Fields type definition for content type 'TypeImageWithCaption'
 * @name TypeImageWithCaptionFields
 * @type {TypeImageWithCaptionFields}
 * @memberof TypeImageWithCaption
 */
export interface TypeImageWithCaptionFields {

    /**
     * Field type definition for field 'title' (Title)
     * @name Title
     * @localized false
     */
    title: EntryFieldTypes.Symbol;

    /**
     * Field type definition for field 'image' (Image)
     * @name Image
     * @localized false
     */
    image: EntryFieldTypes.AssetLink;

    /**
     * Field type definition for field 'caption' (Caption)
     * @name Caption
     * @localized true
     */
    caption: EntryFieldTypes.Symbol;
}

/**
 * Entry skeleton type definition for content type 'imageWithCaption' (🩻 Image With Caption)
 * @name TypeImageWithCaptionSkeleton
 * @type {TypeImageWithCaptionSkeleton}
 * @author 0gveB6TBChXdFEnRDwWnyH
 * @since 2022-06-18T17:35:41.420Z
 * @version 15
 */
export type TypeImageWithCaptionSkeleton = EntrySkeletonType<TypeImageWithCaptionFields, "imageWithCaption">;

/**
 * Entry type definition for content type 'imageWithCaption' (🩻 Image With Caption)
 * @name TypeImageWithCaption
 * @type {TypeImageWithCaption}
 * @author Lauri Lavanti<laurilavanti@gmail.com>
 * @since 2022-06-18T17:35:41.420Z
 * @version 15
 * @link https://app.contentful.com/spaces/44t6u1r4zgqq/environments/main/content_types/imageWithCaption
 */
export type TypeImageWithCaption<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeImageWithCaptionSkeleton, Modifiers, Locales>;

/**
 * Fields type definition for content type 'TypeJobExperience'
 * @name TypeJobExperienceFields
 * @type {TypeJobExperienceFields}
 * @memberof TypeJobExperience
 */
export interface TypeJobExperienceFields {

    /**
     * Field type definition for field 'internalName' (Internal name)
     * @name Internal name
     * @localized false
     */
    internalName: EntryFieldTypes.Symbol;

    /**
     * Field type definition for field 'company' (Company)
     * @name Company
     * @localized false
     */
    company: EntryFieldTypes.Symbol;

    /**
     * Field type definition for field 'location' (Location)
     * @name Location
     * @localized false
     */
    location: EntryFieldTypes.Symbol;

    /**
     * Field type definition for field 'title' (Title)
     * @name Title
     * @localized false
     */
    title: EntryFieldTypes.Symbol;

    /**
     * Field type definition for field 'startYear' (Start year)
     * @name Start year
     * @localized false
     */
    startYear: EntryFieldTypes.Integer;

    /**
     * Field type definition for field 'endYear' (End year)
     * @name End year
     * @localized false
     */
    endYear?: EntryFieldTypes.Integer;
}

/**
 * Entry skeleton type definition for content type 'jobExperience' (🎫 Job experience)
 * @name TypeJobExperienceSkeleton
 * @type {TypeJobExperienceSkeleton}
 * @author 0gveB6TBChXdFEnRDwWnyH
 * @since 2023-10-16T04:01:27.432Z
 * @version 7
 */
export type TypeJobExperienceSkeleton = EntrySkeletonType<TypeJobExperienceFields, "jobExperience">;

/**
 * Entry type definition for content type 'jobExperience' (🎫 Job experience)
 * @name TypeJobExperience
 * @type {TypeJobExperience}
 * @author Lauri Lavanti<laurilavanti@gmail.com>
 * @since 2023-10-16T04:01:27.432Z
 * @version 7
 * @link https://app.contentful.com/spaces/44t6u1r4zgqq/environments/main/content_types/jobExperience
 */
export type TypeJobExperience<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeJobExperienceSkeleton, Modifiers, Locales>;

/**
 * Fields type definition for content type 'TypeMainNav'
 * @name TypeMainNavFields
 * @type {TypeMainNavFields}
 * @memberof TypeMainNav
 */
export interface TypeMainNavFields {

    /**
     * Field type definition for field 'titleToBeIgnored' (Title to be ignored)
     * @name Title to be ignored
     * @localized false
     */
    titleToBeIgnored: EntryFieldTypes.Symbol<"Main nav">;

    /**
     * Field type definition for field 'links' (Links)
     * @name Links
     * @localized false
     */
    links: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypePageSkeleton>>;
}

/**
 * Entry skeleton type definition for content type 'mainNav' (🍔 Main nav)
 * @name TypeMainNavSkeleton
 * @type {TypeMainNavSkeleton}
 * @author 0gveB6TBChXdFEnRDwWnyH
 * @since 2022-06-21T04:55:35.073Z
 * @version 7
 */
export type TypeMainNavSkeleton = EntrySkeletonType<TypeMainNavFields, "mainNav">;

/**
 * Entry type definition for content type 'mainNav' (🍔 Main nav)
 * @name TypeMainNav
 * @type {TypeMainNav}
 * @author Lauri Lavanti<laurilavanti@gmail.com>
 * @since 2022-06-21T04:55:35.073Z
 * @version 7
 * @link https://app.contentful.com/spaces/44t6u1r4zgqq/environments/main/content_types/mainNav
 */
export type TypeMainNav<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeMainNavSkeleton, Modifiers, Locales>;

/**
 * Fields type definition for content type 'TypePage'
 * @name TypePageFields
 * @type {TypePageFields}
 * @memberof TypePage
 */
export interface TypePageFields {

    /**
     * Field type definition for field 'title' (Title)
     * @name Title
     * @localized true
     */
    title: EntryFieldTypes.Symbol;

    /**
     * Field type definition for field 'navigationTitle' (Navigation title)
     * @name Navigation title
     * @localized false
     */
    navigationTitle: EntryFieldTypes.Symbol;

    /**
     * Field type definition for field 'subtitle' (Subtitle)
     * @name Subtitle
     * @localized true
     */
    subtitle?: EntryFieldTypes.Symbol;

    /**
     * Field type definition for field 'secondaryTitle' (Secondary title)
     * @name Secondary title
     * @localized true
     */
    secondaryTitle?: EntryFieldTypes.Symbol;

    /**
     * Field type definition for field 'slug' (Slug)
     * @name Slug
     * @localized false
     */
    slug: EntryFieldTypes.Symbol;

    /**
     * Field type definition for field 'description' (Description)
     * @name Description
     * @localized false
     */
    description: EntryFieldTypes.Symbol;

    /**
     * Field type definition for field 'body' (Body)
     * @name Body
     * @localized true
     */
    body: EntryFieldTypes.RichText;

    /**
     * Field type definition for field 'image' (Image)
     * @name Image
     * @localized false
     */
    image: EntryFieldTypes.AssetLink;

    /**
     * Field type definition for field 'backgroundImage' (Background image)
     * @name Background image
     * @localized false
     */
    backgroundImage?: EntryFieldTypes.AssetLink;

    /**
     * Field type definition for field 'leftAlignedTitle' (Title alignment)
     * @name Title alignment
     * @localized false
     */
    leftAlignedTitle: EntryFieldTypes.Boolean;

    /**
     * Field type definition for field 'socialImage' (Social Image)
     * @name Social Image
     * @localized false
     */
    socialImage?: EntryFieldTypes.AssetLink;

    /**
     * Field type definition for field 'jsonLdType' (JSON-LD type)
     * @name JSON-LD type
     * @localized false
     */
    jsonLdType: EntryFieldTypes.Symbol<"Person" | "WebPage" | "WebSite">;
}

/**
 * Entry skeleton type definition for content type 'page' (🗏 Page)
 * @name TypePageSkeleton
 * @type {TypePageSkeleton}
 * @author 0gveB6TBChXdFEnRDwWnyH
 * @since 2022-06-19T18:22:24.481Z
 * @version 55
 */
export type TypePageSkeleton = EntrySkeletonType<TypePageFields, "page">;

/**
 * Entry type definition for content type 'page' (🗏 Page)
 * @name TypePage
 * @type {TypePage}
 * @author Lauri Lavanti<laurilavanti@gmail.com>
 * @since 2022-06-19T18:22:24.481Z
 * @version 55
 * @link https://app.contentful.com/spaces/44t6u1r4zgqq/environments/main/content_types/page
 */
export type TypePage<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypePageSkeleton, Modifiers, Locales>;

/**
 * Fields type definition for content type 'TypePost'
 * @name TypePostFields
 * @type {TypePostFields}
 * @memberof TypePost
 */
export interface TypePostFields {

    /**
     * Field type definition for field 'title' (Title)
     * @name Title
     * @localized true
     */
    title: EntryFieldTypes.Symbol;

    /**
     * Field type definition for field 'slug' (Slug)
     * @name Slug
     * @localized false
     */
    slug?: EntryFieldTypes.Symbol;

    /**
     * Field type definition for field 'excerpt' (Excerpt)
     * @name Excerpt
     * @localized true
     */
    excerpt: EntryFieldTypes.Symbol;

    /**
     * Field type definition for field 'body' (Body)
     * @name Body
     * @localized true
     */
    body: EntryFieldTypes.RichText;

    /**
     * Field type definition for field 'headerImage' (Header Image)
     * @name Header Image
     * @localized false
     */
    headerImage: EntryFieldTypes.AssetLink;

    /**
     * Field type definition for field 'backgroundImage' (Background image)
     * @name Background image
     * @localized false
     */
    backgroundImage?: EntryFieldTypes.AssetLink;

    /**
     * Field type definition for field 'leftAlignedTitle' (Title alignment)
     * @name Title alignment
     * @localized false
     */
    leftAlignedTitle: EntryFieldTypes.Boolean;

    /**
     * Field type definition for field 'socialImage' (Social image)
     * @name Social image
     * @localized false
     */
    socialImage?: EntryFieldTypes.AssetLink;

    /**
     * Field type definition for field 'oldSlugs' (Old slugs)
     * @name Old slugs
     * @localized false
     */
    oldSlugs?: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;

    /**
     * Field type definition for field 'publishDate' (Publish date)
     * @name Publish date
     * @localized false
     */
    publishDate?: EntryFieldTypes.Date;
}

/**
 * Entry skeleton type definition for content type 'post' (🪧 Post)
 * @name TypePostSkeleton
 * @type {TypePostSkeleton}
 * @author 0gveB6TBChXdFEnRDwWnyH
 * @since 2022-06-18T17:31:59.190Z
 * @version 51
 */
export type TypePostSkeleton = EntrySkeletonType<TypePostFields, "post">;

/**
 * Entry type definition for content type 'post' (🪧 Post)
 * @name TypePost
 * @type {TypePost}
 * @author Lauri Lavanti<laurilavanti@gmail.com>
 * @since 2022-06-18T17:31:59.190Z
 * @version 51
 * @link https://app.contentful.com/spaces/44t6u1r4zgqq/environments/main/content_types/post
 */
export type TypePost<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypePostSkeleton, Modifiers, Locales>;

/**
 * Fields type definition for content type 'TypeYearsFrom'
 * @name TypeYearsFromFields
 * @type {TypeYearsFromFields}
 * @memberof TypeYearsFrom
 */
export interface TypeYearsFromFields {

    /**
     * Field type definition for field 'internalName' (Internal name)
     * @name Internal name
     * @localized false
     */
    internalName: EntryFieldTypes.Symbol;

    /**
     * Field type definition for field 'dateToCountFrom' (Date to count from)
     * @name Date to count from
     * @localized false
     */
    dateToCountFrom: EntryFieldTypes.Date;
}

/**
 * Entry skeleton type definition for content type 'yearsFrom' (📆 Years from)
 * @name TypeYearsFromSkeleton
 * @type {TypeYearsFromSkeleton}
 * @author 0gveB6TBChXdFEnRDwWnyH
 * @since 2024-08-31T15:58:07.944Z
 * @version 1
 */
export type TypeYearsFromSkeleton = EntrySkeletonType<TypeYearsFromFields, "yearsFrom">;

/**
 * Entry type definition for content type 'yearsFrom' (📆 Years from)
 * @name TypeYearsFrom
 * @type {TypeYearsFrom}
 * @author Lauri Lavanti<laurilavanti@gmail.com>
 * @since 2024-08-31T15:58:07.944Z
 * @version 1
 * @link https://app.contentful.com/spaces/44t6u1r4zgqq/environments/main/content_types/yearsFrom
 */
export type TypeYearsFrom<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeYearsFromSkeleton, Modifiers, Locales>;
