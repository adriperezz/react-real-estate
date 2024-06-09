import React from 'react';
import SectionHomePage from '../components/HomePage/SectionHomePage';
import Container from '../Layouts/Container';
import VideoBackground from '../components/HomePage/VideoBackground';

const p1 =
  'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore magnam adipisci consequuntur corrupti, saepe esse sed eveniet modi expedita similique minus ea reprehenderit eligendi dolore. Error assumenda ut vel iure!';
const p2 =
  'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fuga in itaque inventore error. Pariatur unde quis ullam quisquam officia iste in aperiam totam ipsum. Placeat vitae deleniti dignissimos aspernatur libero optio accusamus ad nemo porro?';

const p3 =
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure aspernatur beatae doloribus reprehenderit iusto odio ipsa natus, amet nisi ratione tenetur velit saepe voluptatum ipsam quaerat dolores placeat magni inventore quia. Nam placeat quis dolor officia vero adipisci, earum facere?';
const p4 =
  'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus corrupti laborum corporis maxime ab inventore consectetur, ratione atque accusamus officiis?';

const p5 =
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, officiis ut labore odit fuga dignissimos voluptate ipsum reiciendis ex, aliquid, beatae dolorum architecto delectus eius molestiae rem fugit eveniet officia ipsa maxime laudantium sapiente. Quia eos amet nesciunt, nam dolores nisi! Aspernatur hic quae ad?';
const p6 =
  'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quo ut, unde cum ullam voluptas magnam!';

function Home() {
  return (
    <>
      <VideoBackground />
      <Container bgColor={'bg-own-light'}>
        <SectionHomePage
          firstWord={'about'}
          secondWord={'who we are'}
          p1={p1}
          p2={p2}
          marginTop={'mt-12'}
        />
        <SectionHomePage
          firstWord={'meet'}
          secondWord={'our team'}
          //we do reverse so makes good design
          flexDirection={'flex-row-reverse'}
          //we do textalign right so the reverse
          textAlign={'text-right'}
          //we do margin top -1px so border's sections can collapse
          marginTop={'-mt-px'}
          p1={p3}
          p2={p4}
        />
        <SectionHomePage
          firstWord={'our'}
          secondWord={'history'}
          marginTop={'-mt-px mb-12'}
          p1={p5}
          p2={p6}
        />
      </Container>
    </>
  );
}

export default Home;
