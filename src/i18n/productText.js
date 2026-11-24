/* Vertalingen van productteksten. Engels staat in src/data/products.js.
   Voeg je een product toe? Zet de Nederlandse en Franse tekst hier bij,
   anders toont de site de Engelse tekst. */

export const descriptions = {
  'victory-hoodie-black': {
    nl: 'De iconische Victory Hoodie in diepzwart. Zware 450gsm fleece. Oversized fit. Geborduurd tijgerdetail. Twee krachten. Eén identiteit.',
    fr: 'Le hoodie Victory emblématique en noir profond. Molleton épais 450 g/m². Coupe oversize. Tigre brodé. Deux forces. Une identité.',
  },
  'victory-hoodie-white': {
    nl: 'De iconische Victory Hoodie in gebroken wit. Zware 450gsm fleece. Oversized fit. Geborduurd tijgerdetail.',
    fr: 'Le hoodie Victory emblématique en blanc cassé. Molleton épais 450 g/m². Coupe oversize. Tigre brodé.',
  },
  'victory-hoodie-navy-blue': {
    nl: 'De Victory Hoodie in diep marineblauw. Zware 450gsm fleece. Oversized fit. Geborduurd tijgerdetail.',
    fr: 'Le hoodie Victory en bleu marine profond. Molleton épais 450 g/m². Coupe oversize. Tigre brodé.',
  },
  'bt-tee-white': {
    nl: 'De essentiële BT Tee in strak wit. Premium 240gsm jersey. Licht oversized. Minimalistisch tijgerlogo op de borst.',
    fr: 'Le BT Tee essentiel en blanc pur. Jersey premium 240 g/m². Légèrement oversize. Logo tigre minimaliste sur la poitrine.',
  },
  'amsterdam-edition-t-shirt-black': {
    nl: 'Gelimiteerde Amsterdam Edition in zwart. Premium 240gsm jersey. Licht oversized. Tijgerprint met Amsterdam-detail.',
    fr: 'Amsterdam Edition limitée en noir. Jersey premium 240 g/m². Légèrement oversize. Tigre avec détail signature Amsterdam.',
  },
  'tiger-tee-orange': {
    nl: 'Het meest uitgesproken stuk van de collectie. Premium 240gsm jersey. Licht oversized. Tijgerlogo in oranje ton-sur-ton. Val op zonder iets te zeggen.',
    fr: 'La pièce la plus audacieuse de la collection. Jersey premium 240 g/m². Légèrement oversize. Logo tigre orange ton sur ton. Démarque-toi sans dire un mot.',
  },
  'amsterdam-edition-t-shirt-green': {
    nl: 'Gelimiteerde Amsterdam Edition in legergroen. Premium 240gsm jersey. Licht oversized. Amsterdam-tijgerprint.',
    fr: 'Amsterdam Edition limitée en vert kaki. Jersey premium 240 g/m². Légèrement oversize. Tigre Amsterdam.',
  },
  'tiger-shorts-black': {
    nl: 'Premium zwemshort in diepzwart. Sneldrogende stof. Minimalistisch tijgerlogo op de heup. Van het zwembad naar de straat — omkleden niet nodig.',
    fr: "Short de bain premium en noir profond. Tissu à séchage rapide. Logo tigre minimaliste sur la hanche. De la piscine à la rue — pas besoin de se changer.",
  },
  'tiger-shorts-navy-blue': {
    nl: 'Premium zwemshort in diep marineblauw. Sneldrogende stof. Minimalistisch tijgerlogo op de heup. Ontworpen voor het water. Gemaakt voor de straat.',
    fr: "Short de bain premium en bleu marine profond. Tissu à séchage rapide. Logo tigre minimaliste sur la hanche. Conçu pour l'eau. Fait pour la rue.",
  },
}

export const details = {
  '450gsm heavyweight fleece': { nl: 'Zware 450gsm fleece', fr: 'Molleton épais 450 g/m²' },
  'Oversized fit — size up not required': { nl: 'Oversized fit — geen maat groter nodig', fr: 'Coupe oversize — inutile de prendre une taille au-dessus' },
  'Embroidered tiger graphic': { nl: 'Geborduurde tijger', fr: 'Tigre brodé' },
  'Kangaroo pocket': { nl: 'Kangoeroezak', fr: 'Poche kangourou' },
  '100% cotton': { nl: '100% katoen', fr: '100 % coton' },
  '240gsm premium jersey': { nl: 'Premium 240gsm jersey', fr: 'Jersey premium 240 g/m²' },
  'Slightly oversized fit': { nl: 'Licht oversized fit', fr: 'Coupe légèrement oversize' },
  'Tiger logo at chest': { nl: 'Tijgerlogo op de borst', fr: 'Logo tigre sur la poitrine' },
  'Amsterdam tiger graphic': { nl: 'Amsterdam-tijgerprint', fr: 'Tigre Amsterdam' },
  'Limited run': { nl: 'Gelimiteerde oplage', fr: 'Série limitée' },
  'Quick-dry fabric': { nl: 'Sneldrogende stof', fr: 'Tissu à séchage rapide' },
  'Elastic waistband with drawstring': { nl: 'Elastische tailleband met koord', fr: 'Taille élastique avec cordon' },
  'Side pockets': { nl: 'Zakken opzij', fr: 'Poches latérales' },
  'Minimal tiger logo at hip': { nl: 'Minimalistisch tijgerlogo op de heup', fr: 'Logo tigre minimaliste sur la hanche' },
  'Liner included': { nl: 'Met binnenbroekje', fr: 'Slip intégré' },
}

export function productDescription(product, lang) {
  return descriptions[product.handle]?.[lang] ?? product.description
}

export function productDetail(text, lang) {
  return details[text]?.[lang] ?? text
}
