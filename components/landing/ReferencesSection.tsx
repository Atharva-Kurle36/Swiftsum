'use client';

import React from 'react';
import SectionHeading from '@/components/common/SectionHeading';
import { LotusDivider } from '@/components/common/Motifs';

const REFERENCES = [
  'Baudhayana Sulba Sutra (c. 800 BCE) — geometric constructions, diagonal-rope theorem and early treatment of irrational magnitudes.',
  'Pingala, Chandaḥ Śāstra (c. 300 BCE) — binary classification of metres (laghu–guru), Meru-prastāra and combinatorial enumeration.',
  'Aryabhata, Aryabhatiya, Ganitapada (499 CE) — place-value arithmetic, π approximation (asanna), and planetary computation.',
  'Brahmagupta, Brahmasphutasiddhanta (628 CE) — formal rules for zero and negative numbers; quadratic and indeterminate equations.',
  'Bhaskara II, Siddhanta-Śiromani: Lilavati and Bijaganita (1150 CE) — pedagogy of arithmetic and algebra; Chakravala method.',
  'Madhava of Sangamagrama and the Kerala School (c. 14th–16th c.) — infinite series for sine, cosine and π; Yukti-bhasha demonstrations.',
  'Panini, Ashtadhyayi (c. 5th c. BCE) — generative grammatical system; auxiliary markers and rule composition.',
  'Bharati Krishna Tirtha, Vedic Mathematics (1965) — exposition of sixteen sutras and sub-sutras used in this project for mental computation.',
  'National Education Policy 2020, Ministry of Education, Government of India — Section 4.27 on Indian Knowledge Systems in curricula.',
];

export default function ReferencesSection() {
  return (
    <section id="references" className="section-shell" aria-label="References">
      <div className="section-inner" style={{ maxWidth: '880px', margin: '0 auto' }}>
        <SectionHeading
          kicker="Section 06 — References"
          eyebrow="Bibliography · Primary Treatises"
          title="References"
          description="Primary Sanskrit treatises and curricular sources consulted. Original order and citations preserved."
        />
        <div className="manuscript-page corner-motifs">
          <span className="corner tl" aria-hidden="true">◈</span>
          <span className="corner tr" aria-hidden="true">◈</span>
          <span className="corner bl" aria-hidden="true">◈</span>
          <span className="corner br" aria-hidden="true">◈</span>
          <ol className="reference-list">
            {REFERENCES.map(r => <li key={r.slice(0, 24)}>{r}</li>)}
          </ol>
          <LotusDivider />
          <p style={{ fontSize: '0.8rem', color: '#8C7763', textAlign: 'center', fontStyle: 'italic' }}>
            Formatting follows a clean numbered academic style for A4 print submission.
          </p>
        </div>
      </div>
    </section>
  );
}
