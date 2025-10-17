#!/bin/bash
# Script to fix all remaining accessibility issues

cd "$(dirname "$0")/src/pages"

# Fix remaining FAQ buttons by adding aria-labels and aria-expanded
sed -i.bak2 '
/Pot să-mi modific singur/,/<\/button>/ {
  s/<button class="faq-question[^>]*" onclick="toggleFAQ(this)">/<button class="faq-question w-full text-left p-6 flex justify-between items-center hover:bg-gray-50 transition-colors" onclick="toggleFAQ(this)" aria-label="Întrebare: Pot să-mi modific singur conținutul pe website?" aria-expanded="false">/
  s/<i class="fas fa-chevron-down text-pink-600 transition-transform duration-300"><\/i>/<i class="fas fa-chevron-down text-pink-600 transition-transform duration-300" aria-hidden="true"><\/i>/
}
/Cum funcționează garanția/,/<\/button>/ {
  s/<button class="faq-question[^>]*" onclick="toggleFAQ(this)">/<button class="faq-question w-full text-left p-6 flex justify-between items-center hover:bg-gray-50 transition-colors" onclick="toggleFAQ(this)" aria-label="Întrebare: Cum funcționează garanția de +300% clienți?" aria-expanded="false">/
  s/<i class="fas fa-chevron-down text-pink-600 transition-transform duration-300"><\/i>/<i class="fas fa-chevron-down text-pink-600 transition-transform duration-300" aria-hidden="true"><\/i>/
}
/Ce informații aveți nevoie/,/<\/button>/ {
  s/<button class="faq-question[^>]*" onclick="toggleFAQ(this)">/<button class="faq-question w-full text-left p-6 flex justify-between items-center hover:bg-gray-50 transition-colors" onclick="toggleFAQ(this)" aria-label="Întrebare: Ce informații aveți nevoie de la mine?" aria-expanded="false">/
  s/<i class="fas fa-chevron-down text-pink-600 transition-transform duration-300"><\/i>/<i class="fas fa-chevron-down text-pink-600 transition-transform duration-300" aria-hidden="true"><\/i>/
}
/Cum se fac plățile/,/<\/button>/ {
  s/<button class="faq-question[^>]*" onclick="toggleFAQ(this)">/<button class="faq-question w-full text-left p-6 flex justify-between items-center hover:bg-gray-50 transition-colors" onclick="toggleFAQ(this)" aria-label="Întrebare: Cum se fac plățile?" aria-expanded="false">/
  s/<i class="fas fa-chevron-down text-pink-600 transition-transform duration-300"><\/i>/<i class="fas fa-chevron-down text-pink-600 transition-transform duration-300" aria-hidden="true"><\/i>/
}
/Lucrați doar cu saloane/,/<\/button>/ {
  s/<button class="faq-question[^>]*" onclick="toggleFAQ(this)">/<button class="faq-question w-full text-left p-6 flex justify-between items-center hover:bg-gray-50 transition-colors" onclick="toggleFAQ(this)" aria-label="Întrebare: Lucrați doar cu saloane și clinici?" aria-expanded="false">/
  s/<i class="fas fa-chevron-down text-pink-600 transition-transform duration-300"><\/i>/<i class="fas fa-chevron-down text-pink-600 transition-transform duration-300" aria-hidden="true"><\/i>/
}
/Cât costă după primul an/,/<\/button>/ {
  s/<button class="faq-question[^>]*" onclick="toggleFAQ(this)">/<button class="faq-question w-full text-left p-6 flex justify-between items-center hover:bg-gray-50 transition-colors" onclick="toggleFAQ(this)" aria-label="Întrebare: Cât costă după primul an?" aria-expanded="false">/
  s/<i class="fas fa-chevron-down text-pink-600 transition-transform duration-300"><\/i>/<i class="fas fa-chevron-down text-pink-600 transition-transform duration-300" aria-hidden="true"><\/i>/
}
/Dacă nu am poze sau texte/,/<\/button>/ {
  s/<button class="faq-question[^>]*" onclick="toggleFAQ(this)">/<button class="faq-question w-full text-left p-6 flex justify-between items-center hover:bg-gray-50 transition-colors" onclick="toggleFAQ(this)" aria-label="Întrebare: Dacă nu am poze sau texte pentru site?" aria-expanded="false">/
  s/<i class="fas fa-chevron-down text-pink-600 transition-transform duration-300"><\/i>/<i class="fas fa-chevron-down text-pink-600 transition-transform duration-300" aria-hidden="true"><\/i>/
}
' index.astro

# Fix social media links in Contact section
sed -i.bak3 '
/<a href="#" class="bg-blue-600.*facebook/s/<a href="#" class="bg-blue-600[^>]*>/<a href="#" class="bg-blue-600 hover:bg-blue-700 text-white w-12 h-12 flex items-center justify-center rounded-lg transition-all duration-300 shadow-md hover:shadow-lg" aria-label="Vizitează pagina noastră de Facebook">/
/<i class="fab fa-facebook-f text-xl"><\/i>/s/<i class="fab fa-facebook-f text-xl"><\/i>/<i class="fab fa-facebook-f text-xl" aria-hidden="true"><\/i>/

/<a href="#" class="bg-gradient-to-br from-purple-600.*instagram/s/<a href="#" class="bg-gradient-to-br[^>]*>/<a href="#" class="bg-gradient-to-br from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white w-12 h-12 flex items-center justify-center rounded-lg transition-all duration-300 shadow-md hover:shadow-lg" aria-label="Urmărește-ne pe Instagram">/
/<i class="fab fa-instagram text-xl"><\/i>/s/<i class="fab fa-instagram text-xl"><\/i>/<i class="fab fa-instagram text-xl" aria-hidden="true"><\/i>/

/<a href="#" class="bg-blue-500.*linkedin/s/<a href="#" class="bg-blue-500[^>]*>/<a href="#" class="bg-blue-500 hover:bg-blue-600 text-white w-12 h-12 flex items-center justify-center rounded-lg transition-all duration-300 shadow-md hover:shadow-lg" aria-label="Conectează-te cu noi pe LinkedIn">/
/<i class="fab fa-linkedin-in text-xl"><\/i>/s/<i class="fab fa-linkedin-in text-xl"><\/i>/<i class="fab fa-linkedin-in text-xl" aria-hidden="true"><\/i>/

/<a href="#" class="bg-red-600.*youtube/s/<a href="#" class="bg-red-600[^>]*>/<a href="#" class="bg-red-600 hover:bg-red-700 text-white w-12 h-12 flex items-center justify-center rounded-lg transition-all duration-300 shadow-md hover:shadow-lg" aria-label="Abonează-te la canalul nostru YouTube">/
/<i class="fab fa-youtube text-xl"><\/i>/s/<i class="fab fa-youtube text-xl"><\/i>/<i class="fab fa-youtube text-xl" aria-hidden="true"><\/i>/
' index.astro

echo "Accessibility fixes applied successfully!"
