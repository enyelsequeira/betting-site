import Container from '@/common/ui/Container/Container';
import Text from '@/common/ui/Text/Text';
import useStore from '@/store/useStore';
import { BETS } from '@/utils/constants';
import { EmojiHappyIcon, EmojiSadIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

const Game = () => {
  const router = useRouter();
  const { id } = router.query;
  const user = useStore((state) => state.user);
  const loseBet = useStore((state) => state.decreaseUserBalance);
  const isLoggedIn = useStore((state) => state.isLoggedIn);
  const winBet = useStore((state) => state.increaseUserBalance);

  const createBet = (value: number) => {
    const random = Math.random();
    if ((user?.balance as number) < value) {
      toast.error('You do not have enough money');
    } else if (random > 0.5) {
      winBet(value * 2);
      toast.success('You win!', {
        icon: <EmojiHappyIcon width={40} />,
        style: {
          backgroundColor: '#00b894',
        },
      });
    } else {
      loseBet(value);
      toast.error('You lose!', {
        icon: <EmojiSadIcon width={40} />,
        style: {
          backgroundColor: '#ff7675',
        },
      });
    }
  };

  return (
    <Container>
      <Text as="h1" className="text-white mt-5 text-center text-3xl">
        Game #{id}
      </Text>
      <Container className=' bg-[url("/images/luckyseven.png")] w-full min-h-screen bg-no-repeat bg-top  flex justify-between flex-col lg:flex-row'>
        <div className=" flex items-center flex-col lg:px-2">
          <Text as="h1" className="text-white mt-5 text-center text-3xl">
            Balance
          </Text>
          <Text>
            <span className="text-white">
              {isLoggedIn ? `$ ${user?.balance}` : 'Please Login'}
            </span>
          </Text>
        </div>
        <div className="w-[90%] self-center flex flex-col">
          <Text
            as="h1"
            className="!text-red-200 mt-5 text-center text-4xl font-bold my-3"
          >
            What&#39;s your bet?
          </Text>
          <div className="grid w-full grid-cols-4 gap-4 mt-3">
            {BETS.map((bet) => {
              return (
                <Container
                  key={bet.value}
                  onClick={() => {
                    if (!isLoggedIn) {
                      toast.error('You need to be logged in to bet');
                      router.push('/');
                    } else {
                      createBet(bet.value);
                    }
                  }}
                  as="button"
                  className="border p-4 shadow-md bg-gradient-to-t to-slate-500 from-red-200 via-slate-400"
                >
                  <Text as="h1" className="text-white  text-center text-3xl">
                    {bet.title}
                  </Text>
                </Container>
              );
            })}
          </div>
        </div>
      </Container>
    </Container>
  );
};

export default Game;

// will this data change often?
// if os we could use ssr => server side rendering
// if not we can create static site generator and then when the user visit these routes are fast for them

// the option being used here is just using the router and we can use the router to get the data from the server
