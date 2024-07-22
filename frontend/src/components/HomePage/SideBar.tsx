import { ChevronDown, ChevronUp, Clapperboard, Clock, Film, Flame, Gamepad2, History, Home, Library, Lightbulb, ListVideo, Music2, Newspaper, PlaySquare, Podcast, Radio, Repeat, Shirt, ShoppingBag, Trophy } from "lucide-react";
import { Children, ElementType, ReactNode, useState } from "react";
import Button, { buttonStyles } from "../Button";
import { twMerge } from "tailwind-merge";
import { playlists, subscriptions } from "../../temp/home";

const SideBar = () => {
  return (
    <>
      <aside className="sticky top-0 overflow-y-auto scrollbar-hidden pb-4 flex flex-col ml-1 lg:hidden">
        <SmallSideBarItem Icon={Home} title="Home" url="/" />
        <SmallSideBarItem Icon={Repeat} title="Home" url="/" />
        <SmallSideBarItem
          Icon={Clapperboard}
          title="Subscriptions"
          url="/subscriptions"
        />
        <SmallSideBarItem Icon={Library} title="Library" url="/library" />
      </aside>
      <aside className="w-56 lg:sticky absolute top-0 overflow-y-auto scrollbar-hidden pb-4 lg:flex hidden flex-col gap-2 px-2">
        <LargeSideBarSection>
          <LargeSideBarItem isActive IconOrImageUrl={Home} title="Home" url="/" />
          <LargeSideBarItem IconOrImageUrl={Clapperboard} title="Subscriptions" url="/subscriptions" />
        </LargeSideBarSection>
        <hr />
        <LargeSideBarSection visibleItemCount={5}>
            <LargeSideBarItem IconOrImageUrl={Library} title="Library" url="/library" />
            <LargeSideBarItem IconOrImageUrl={History} title="History" url="/history" />
            <LargeSideBarItem IconOrImageUrl={PlaySquare} title="Your Videos" url="/videos" />
            <LargeSideBarItem IconOrImageUrl={Clock} title="Watch Later" url="/videos" />  
            {playlists.map((playlist) => (
                <LargeSideBarItem key={playlist.id} IconOrImageUrl={ListVideo} title={playlist.name} url={"url"} />  
            ))}
        </LargeSideBarSection>
        <hr />
        <LargeSideBarSection visibleItemCount={5} title="Subscriptions">
            {subscriptions.map((subscription) => (
                <LargeSideBarItem key={subscription.id} IconOrImageUrl={subscription.imgUrl} title={subscription.channelName} url={"url"} />  
            ))}  
        </LargeSideBarSection>
        <hr />
        <LargeSideBarSection title="Explore">
            <LargeSideBarItem
                IconOrImageUrl={Flame}
                title="Trending"
                url="/trending"
            />
            <LargeSideBarItem
                IconOrImageUrl={ShoppingBag}
                title="Shopping"
                url="/shopping"
            />
            <LargeSideBarItem IconOrImageUrl={Music2} title="Music" url="/music" />
            <LargeSideBarItem
                IconOrImageUrl={Film}
                title="Movies & TV"
                url="/movies-tv"
            />
            <LargeSideBarItem IconOrImageUrl={Radio} title="Live" url="/live" />
            <LargeSideBarItem
                IconOrImageUrl={Gamepad2}
                title="Gaming"
                url="/gaming"
            />
            <LargeSideBarItem IconOrImageUrl={Newspaper} title="News" url="/news" />
            <LargeSideBarItem
                IconOrImageUrl={Trophy}
                title="Sports"
                url="/sports"
            />
            <LargeSideBarItem
                IconOrImageUrl={Lightbulb}
                title="Learning"
                url="/learning"
            />
            <LargeSideBarItem
                IconOrImageUrl={Shirt}
                title="Fashion & Beauty"
                url="/fashion-beauty"
            />
            <LargeSideBarItem
                IconOrImageUrl={Podcast}
                title="Podcasts"
                url="/podcasts"
            />
        </LargeSideBarSection>
      </aside>
    </>
  );
};

type SmallSideBarItemProps = {
  Icon: ElementType;
  title: string;
  url: string;
};

const SmallSideBarItem = ({ Icon, title, url }: SmallSideBarItemProps) => {
  return (
    <a
      href={url}
      className={twMerge(
        buttonStyles({ variant: "ghost" }),
        "py-4 px-1 flex flex-col items-center rounded-lg gap-1"
      )}
    >
      <Icon className="w-6 h-6" />
      <div className="text-sm">{title}</div>
    </a>
  );
};

type LargeSideBarSectionProps = {
  children: ReactNode;
  title?: string;
  visibleItemCount?: number;
};

function LargeSideBarSection({
  children,
  title,
  visibleItemCount = Number.POSITIVE_INFINITY,
}: LargeSideBarSectionProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const childrenArray = Children.toArray(children).flat();
    const showExpandButton = childrenArray.length > visibleItemCount;
    const visibleChildren = isExpanded ? childrenArray : childrenArray.slice(0, visibleItemCount);
    const ButtonIcon = isExpanded ? ChevronUp : ChevronDown;
    return (
        <div>
            {title && <div className="ml-4 mt-2 text-lg mb-1">{title}</div>}
            {visibleChildren}
            {showExpandButton && 
                <Button variant="ghost" className="w-full flex items-center rounded-lg gap-4 p-3" onClick={() => setIsExpanded(e => !e)} > 
                    <ButtonIcon className="w-6 h-6" />
                    <div>{isExpanded ? "Show less" : "Show more"}</div>
                </Button>
            }
        </div>
    );
}

type LargeSideBarItemProps = {
  IconOrImageUrl: ElementType | string;
  title: string;
  url: string;
  isActive?: boolean;
};

function LargeSideBarItem({
    IconOrImageUrl,
    title,
    url,
    isActive = false,
}: LargeSideBarItemProps) {
  return (
    <a
      href={url}
      className={twMerge(
        buttonStyles({ variant: "ghost" }),
        `w-full flex items-center rounded-lg gap-4 p-3 ${
          isActive ? "font-bold bg-neutral-100 hover:bg-secondary" : undefined
        }`
      )}
    >
      {typeof IconOrImageUrl === "string" ? <img src={IconOrImageUrl} className="w-6 h-6 rounded-full" /> : <IconOrImageUrl className="w-6 h-6" />}
      <div
        className={`text-sm whitespace-nowrap overflow-hidden text-ellipsis`}
      >
        {title}
      </div>
    </a>
  );
}

export default SideBar;
