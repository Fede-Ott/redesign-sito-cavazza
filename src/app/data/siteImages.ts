const asset = (fileName: string) => new URL(`../../assets/${fileName}`, import.meta.url).href

export const serviceImages = {
  scePrimary: asset('SCE.webp'),
  sceSecondary: asset('image (1).webp'),
  lowVision: asset('CentroIpovisione.webp'),
  aidLibraryIt: asset('ausilioteca (1).webp'),
  aidLibraryTraditional: asset('ausilioteca (2).webp'),
}

export const trainingImages = {
  professional: asset('formazioneProfessionale (1).webp'),
  professionalAlternate: asset('formazioneProfessionale (2).webp'),
}

export const instituteImages = {
  history: asset('history.webp'),
  classrooms: asset('aule-cavazza.webp'),
  residence: asset('residence.webp'),
}

export const anterosGalleryImages = [
  asset('galleryAnteros (1).webp'),
  asset('galleryAnteros (2).webp'),
  asset('galleryAnteros (3).webp'),
  asset('galleryAnteros (4).webp'),
  asset('galleryAnteros (5).webp'),
  asset('galleryAnteros (6).webp'),
  asset('galleryAnteros (7).webp'),
  asset('galleryAnteros (8).webp'),
  asset('galleryAnteros (9).webp'),
  asset('galleryAnteros (10).webp'),
  asset('galleryAnteros (11).webp'),
  asset('galleryAnteros (12).webp'),
]

export const tolomeoGalleryImages = [
  asset('galleryTolomeo.webp'),
  asset('galleryTolomeo-1.webp'),
  asset('galleryTolomeo-2.webp'),
  asset('galleryTolomeo-3.webp'),
  asset('galleryTolomeo-4.webp'),
  asset('galleryTolomeo-5.webp'),
  asset('galleryTolomeo-6.webp'),
  asset('galleryTolomeo-7.webp'),
  asset('galleryTolomeo-8.webp'),
  asset('galleryTolomeo-9.webp'),
  asset('galleryTolomeo-10.webp'),
  asset('galleryTolomeo-11.webp'),
]

export const siteImageUrls = [
  serviceImages.scePrimary,
  serviceImages.sceSecondary,
  serviceImages.lowVision,
  serviceImages.aidLibraryIt,
  serviceImages.aidLibraryTraditional,
  trainingImages.professional,
  trainingImages.professionalAlternate,
  instituteImages.history,
  instituteImages.classrooms,
  instituteImages.residence,
]

export function getSiteImage(index: number) {
  return siteImageUrls[index % siteImageUrls.length]
}