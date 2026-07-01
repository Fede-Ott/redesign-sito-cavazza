const asset = (fileName: string) => new URL(`../../assets/${fileName}`, import.meta.url).href

export const serviceImages = {
  scePrimary: asset('SCE.jpg'),
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
  asset('galleryAnteros (1).png'),
  asset('galleryAnteros (2).png'),
  asset('galleryAnteros (3).png'),
  asset('galleryAnteros (4).png'),
  asset('galleryAnteros (5).png'),
  asset('galleryAnteros (6).png'),
  asset('galleryAnteros (7).png'),
  asset('galleryAnteros (8).png'),
  asset('galleryAnteros (9).png'),
  asset('galleryAnteros (10).png'),
  asset('galleryAnteros (11).png'),
  asset('galleryAnteros (12).png'),
]

export const tolomeoGalleryImages = [
  asset('galleryTolomeo.png'),
  asset('galleryTolomeo-1.png'),
  asset('galleryTolomeo-2.png'),
  asset('galleryTolomeo-3.png'),
  asset('galleryTolomeo-4.png'),
  asset('galleryTolomeo-5.png'),
  asset('galleryTolomeo-6.png'),
  asset('galleryTolomeo-7.png'),
  asset('galleryTolomeo-8.png'),
  asset('galleryTolomeo-9.png'),
  asset('galleryTolomeo-10.png'),
  asset('galleryTolomeo-11.png'),
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