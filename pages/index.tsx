import { NextPage } from "next";
import Head from "next/head";
import LogIn from '../components/LogIn';


const Home: NextPage = () => {

  return (
    <>

      <Head>
        <title>RP-Tui</title>
        <meta name="theme-color=dark"></meta> 
        <meta name="description" content="This is a TUI rpg game"></meta>
      </Head>

      <LogIn />
    
    
    
    </>
  );
}

export default Home;
