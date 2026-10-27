import ApplicationList from "@/components/ApplicationList";
import User from "@/components/User";
import {headers} from "next/headers";
import StatusTab from "@/components/StatusTab";
import StatsCard from "@/components/StatsCard";
import { ApplicationsProvider } from "@/components/ApplicationsContext";
import Navbar from "@/components/navabar";

export default async function Home() {
  const headerList = await headers();
  const userId = headerList.get('userId');
  if(!userId){
    return null;
  }
  return (
    <div>
      <Navbar/>
      <ApplicationsProvider>
        <User/>
        <StatsCard/>
        <StatusTab/>
        <ApplicationList />
      </ApplicationsProvider>
    </div>
  );
}
''