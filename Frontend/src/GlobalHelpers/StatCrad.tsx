import React from "react";
import "../styles/StatCard.css";

import Login from "/Assets/Icons/StatCardIcons/Login.svg";
import FileText from "/Assets/Icons/StatCardIcons/FileText.svg";
import CardSend from "/Assets/Icons/StatCardIcons/CardSend.svg";
import Banknote from "/Assets/Icons/StatCardIcons/Banknote.svg";
import Sleeping from "/Assets/Icons/StatCardIcons/Sleeping.svg";
import BrownCube from "/Assets/Icons/StatCardIcons/BrownCube.svg";
import CyanCheck from "/Assets/Icons/StatCardIcons/CyanCheck.svg";
import UserBlock from "/Assets/Icons/StatCardIcons/UserBlock.svg";
import CardSearch from "/Assets/Icons/StatCardIcons/CardSearch.svg";
import OrangeSofa from "/Assets/Icons/StatCardIcons/OrangeSofa.svg";
import UserHandUp from "/Assets/Icons/StatCardIcons/UserHandUp.svg";
import VioletBill from "/Assets/Icons/StatCardIcons/VioletBill.svg";
import JarOfPills from "/Assets/Icons/StatCardIcons/JarOfPills.svg";
import MedicalKit from "/Assets/Icons/StatCardIcons/MedicalKit.svg";
import SortByTime from "/Assets/Icons/StatCardIcons/SortByTime.svg";
import BluePills3 from "/Assets/Icons/StatCardIcons/BluePills3.svg";
import OrangeClock from "/Assets/Icons/StatCardIcons/OrangeClock.svg";
import RedTestTube from "/Assets/Icons/StatCardIcons/RedTestTube.svg";
import ScreenShare from "/Assets/Icons/StatCardIcons/ScreenShare.svg";
import RedHeartBeat from "/Assets/Icons/StatCardIcons/RedHeartBeat.svg";
import RedDoubleBed from "/Assets/Icons/StatCardIcons/RedDoubleBed.svg";
import BlueUserHeart from "/Assets/Icons/StatCardIcons/BlueUserHeart.svg";
import CyanChecklist from "/Assets/Icons/StatCardIcons/CyanChecklist.svg";
import FileCorrupted from "/Assets/Icons/StatCardIcons/FileCorrupted.svg";
import VioletBuilding from "/Assets/Icons/StatCardIcons/VioletBuilding.svg";
import BrownBillCheck from "/Assets/Icons/StatCardIcons/BrownBillCheck.svg";
import BrownDollarIcon from "/Assets/Icons/StatCardIcons/BrownDollarIcon.svg";
import BlueBillCheck from "/Assets/Icons/StatCardIcons/BlueBillCheck.svg";
import BrownSortByTime from "/Assets/Icons/StatCardIcons/BrownSortByTime.svg";
import SkyBlueCalendar from "/Assets/Icons/StatCardIcons/SkyBlueCalendar.svg";
import VioletChecklist from "/Assets/Icons/StatCardIcons/VioletChecklist.svg";
import CyanDocumentIcon from "/Assets/Icons/StatCardIcons/CyanDocumentIcon.svg";
import OrangeSingleUser from "/Assets/Icons/StatCardIcons/OrangeSingleUser.svg";
import SoilDangerCircle from "/Assets/Icons/StatCardIcons/SoilDangerCircle.svg";
import UserCheckRounded from "/Assets/Icons/StatCardIcons/UserCheckRounded.svg";
import LightPinkCalendar from "/Assets/Icons/StatCardIcons/LightPinkCalendar.svg";
import OrangeDottedClock from "/Assets/Icons/StatCardIcons/OrangeDottedClock.svg";
import BrownDottedCalendar from "/Assets/Icons/StatCardIcons/BrownDottedCalendar.svg";
import SortFromBottomToTop from "/Assets/Icons/StatCardIcons/SortFromBottomToTop.svg";
import UsersGroupTwoRounded from "/Assets/Icons/StatCardIcons/UsersGroupTwoRounded.svg";
import RedSortFromBottomToTop from "/Assets/Icons/StatCardIcons/RedSortFromBottomToTop.svg";
import SkyBlueHospitalBuilding from "/Assets/Icons/StatCardIcons/SkyBlueHospitalBuilding.svg";

interface StatCardProps {
  title?: string;
  value?: number | string;
  icon?: string;
  color?: string;
}

const ICONS: Record<string, string> = {
  LOGIN: Login,
  FILETEXT: FileText,
  BANKNOTE: Banknote,
  CARDSEND: CardSend,
  SLEEPING: Sleeping,
  BROWNCUBE: BrownCube,
  CYANCHECK: CyanCheck,
  USERBLOCK: UserBlock,
  MEDICALKIT: MedicalKit,
  BLUEPILLS3: BluePills3,
  JAROFPILLS: JarOfPills,
  CARDSEARCH: CardSearch,
  USERHANDUP: UserHandUp,
  ORANGESOFA: OrangeSofa,
  SORTBYTIME: SortByTime,
  BLUEUSER: BlueUserHeart,
  SCREENSHARE: ScreenShare,
  ORANGECLOCK: OrangeClock,
  REDTESTTUBE: RedTestTube,
  REDDOUBLEBED: RedDoubleBed,
  BLUEBILLCHEC:BlueBillCheck,
  REDSORTFROMBOTTOMTOTOP: RedSortFromBottomToTop,
  BROWNSORTBYTIME: BrownSortByTime,
  REDHEARTBEAT: RedHeartBeat,
  VIOLETBILL:VioletBill,
  FILECORRUPTED: FileCorrupted,
  CYANCHECKLIST: CyanChecklist,
  BLUECALENDAR: SkyBlueCalendar,
  BROWNBILLCHECK: BrownBillCheck,
  USERCHECKROUNDED: UserCheckRounded,
  VIOLETBUILDING: VioletBuilding,
  PINKCALENDAR: LightPinkCalendar,
  VIOLETCHECKLIST: VioletChecklist,
  BROWNDOLLARICON: BrownDollarIcon,
  CYANDOCUMENTICON: CyanDocumentIcon,
  ORANGESINGLEUSER: OrangeSingleUser,
  SOILDANGERCIRCLE: SoilDangerCircle,
  ORANGEDOTTEDCLOCK: OrangeDottedClock,
  BROWNDOTTEDCALENDAR: BrownDottedCalendar,
  SORTFROMBOTTOMTOTOP: SortFromBottomToTop,
  USERSGROUPTWOROUNDED: UsersGroupTwoRounded,
  SKYBLUEHOSPITALBUILDING: SkyBlueHospitalBuilding,
};

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  color,
}) => {
  const selectedIcon = icon
    ? ICONS[icon.toUpperCase()]
    : "";

  return (
    <div
      className="stat-card"
      style={{
        borderBottom: color
          ? `2px solid ${color}`
          : "2px solid transparent",
      }}
    >
      <div className="stat-card-header">
        <h4 className="stat-card-title">{title}</h4>

        {selectedIcon && (
          <div
            className="stat-card-icon-wrapper"
            style={{
              backgroundColor: color ? `${color}30` : "#ffffff",
              border: color ? "none" : "0.5px solid #00000033",
              width: color ? "32px" : "40px",
              height: color ? "32px" : "40px",
            }}
          >
            <img
              src={selectedIcon}
              alt={icon}
              className="stat-card-icon"
            />
          </div>
        )}
      </div>

      <div className="stat-card-footer">
        <h2 className="stat-card-value">{value}</h2>
      </div>
    </div>
  );
};

export default StatCard;