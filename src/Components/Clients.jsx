import { useEffect, useRef } from 'react';
import { motion as Motion } from 'framer-motion';
import { gsap } from 'gsap';
import { Observer } from 'gsap/Observer';

gsap.registerPlugin(Observer);

const clientsData = [
  { id: 1, name: 'Bullit Digital', logo: 'https://cdn.prod.website-files.com/6848603da8e6ac95794b74a9/69241146b4df63c4ca966552_Bullit%20Digital.svg' },
  { id: 2, name: 'Morssinkhof', logo: 'https://cdn.prod.website-files.com/6848603da8e6ac95794b74a9/68c194e6d1b186563459b107_morssinkhof.svg' },
  { id: 3, name: 'Salontopper', logo: 'https://cdn.prod.website-files.com/6848603da8e6ac95794b74a9/6849d88f755388cc2c74ecff_salontopper.svg' },
  { id: 4, name: 'Seesing', logo: 'https://cdn.prod.website-files.com/6848603da8e6ac95794b74a9/6849d880bed5996600cbc586_seesing-flex.svg' },
  { id: 5, name: 'Graafschap College', logo: 'https://cdn.prod.website-files.com/6848603da8e6ac95794b74a9/6849d86cd6ba384af3c14e58_graafschap-college.svg' },
  { id: 6, name: 'Fides', logo: 'https://cdn.prod.website-files.com/6848603da8e6ac95794b74a9/6849d85341bf0d7476e56a8c_fides.svg' },
  { id: 7, name: 'SRHK', logo: 'https://cdn.prod.website-files.com/6848603da8e6ac95794b74a9/6849d838fc5735f090bd9843_SRHK.svg' },
  { id: 8, name: 'KNLTB', logo: 'https://cdn.prod.website-files.com/6848603da8e6ac95794b74a9/6849d81e72e08110e3fd1a17_knltb.svg' },
  { id: 9, name: 'THO', logo: 'https://cdn.prod.website-files.com/6848603da8e6ac95794b74a9/684b062ebc242028ca4b3ea1_tho.svg' },
  { id: 10, name: 'De Talententuin', logo: 'https://cdn.prod.website-files.com/6848603da8e6ac95794b74a9/684c05642bf8f5cea7384403_de-talententuin.svg' },
  { id: 11, name: 'ZCLV', logo: 'https://cdn.prod.website-files.com/6848603da8e6ac95794b74a9/68c1952f22281ee50d3620b5_zclv.svg' }
];

const Clients = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const content = containerRef.current;
    const originalCards = Array.from(content.children);
    
    // Duplicate all cards for infinite scroll effect
    originalCards.forEach(card => {
      const clone = card.cloneNode(true);
      content.appendChild(clone);
    });

    const cards = content.querySelectorAll('.client-card-wrapper');
    const cardsLength = cards.length / 2;
    const half = content.clientWidth / 2;
    const wrap = gsap.utils.wrap(-half, 0);

    let total = 0;
    const xTo = gsap.quickTo(content, "x", {
      duration: 0.5,
      ease: 'power3',
      modifiers: {
        x: gsap.utils.unitize(wrap),
      },
    });

    // Generate random values per card for animation
    const itemValues = [];
    for (let i = 0; i < cardsLength; i++) {
      itemValues.push((Math.random() - 0.5) * 20);
    }

    // Create GSAP timeline
    const tl = gsap.timeline({ paused: true });
    tl.to(cards, {
      rotate: (index) => itemValues[index % cardsLength],
      xPercent: (index) => itemValues[index % cardsLength],
      yPercent: (index) => itemValues[index % cardsLength],
      scale: 0.95,
      duration: 0.5,
      ease: 'back.inOut(3)',
    });

    // Activate drag & animations
    const observer = Observer.create({
      target: content,
      type: "pointer,touch",
      onPress: () => tl.play(),
      onDrag: (self) => {
        total += self.deltaX;
        xTo(total);
      },
      onRelease: () => tl.reverse(),
      onStop: () => tl.reverse(),
    });

    // Auto scroll
    const tick = (time, deltaTime) => {
      total -= deltaTime / 10;
      xTo(total);
    };
    gsap.ticker.add(tick);

    return () => {
      observer.kill();
      gsap.ticker.remove(tick);
      tl.kill();
    };
  }, []);

  return (
    <section className="section_clients">
      <div className="section-padding-128px">
        <div className="padding-global">
          <div className="w-layout-blockcontainer container-col-12 w-container">
            <div className="padding-bottom padding-72px">
              <div className="max-width-full">
                <h2 className="heading-m">
                  These brands<br />
                  got hyped.
                </h2>
              </div>
            </div>
            <div className="mwg_effect008 overflow-hidden">
              <div 
                ref={containerRef}
                className="container is-clients-marquee flex gap-[1vw] w-max select-none cursor-grab active:cursor-grabbing"
                style={{ whiteSpace: 'nowrap', padding: '0 1vw 0 0' }}
              >
                {clientsData.map((client, index) => (
                  <div
                    key={`${client.id}-${index}`}
                    className="card client-card-wrapper"
                  >
                    <div className="client-card">
                      <img
                        src={client.logo}
                        alt={client.name}
                        className="image w-full h-full object-contain"
                        draggable="false"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="padding-global">
        <div className="section-divider border-t border-black/10"></div>
      </div>
    </section>
  );
};

export default Clients;
