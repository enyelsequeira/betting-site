import Container from '@/common/ui/Container/Container';
import Text from '@/common/ui/Text/Text';
import Image from 'next/image';

const Hero = () => {
  return (
    <Container as="main" className="mt-7 h-full">
      {/* Hero card */}
      <div className="relative h-full">
        <div className="mx-auto ">
          <div className="relative shadow-xl sm:rounded-2xl sm:overflow-hidden">
            <div className="absolute inset-0">
              <Image
                layout="fill"
                className="h-full w-full object-cover"
                src="/bg.svg"
                alt="People working on laptops"
              />
              <div className="absolute inset-0 bg-indigo-700 mix-blend-multiply" />
            </div>
            <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
              <Text
                as="h1"
                className="text-center text-4xl font-bold tracking-tight sm:text-5xl sm:tracking-tight lg:text-6xl lg:tracking-tight"
              >
                <span className="block text-white">Ready to BET?</span>
                <span className="block text-indigo-200">Best place online to do so</span>
              </Text>
              <p className="mt-6 max-w-lg mx-auto text-center text-xl text-indigo-200 sm:max-w-3xl">
                Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem
                cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Hero;
