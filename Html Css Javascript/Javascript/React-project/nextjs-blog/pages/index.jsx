import styled from "styled-components";

import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const TimelineRow = ({ content, label }) => {
  return (
    <TimelineItem>
      <TimelineSeparator>
        <TimelineDot data-aos="fade-left" variant="outlined" color="primary" />
        <TimelineConnector data-aos="fade-in" />
      </TimelineSeparator>
      <TimelineContent data-aos="fade-up">
        <span>2019</span>
        <span>hello</span>
      </TimelineContent>
    </TimelineItem>
  );
};

const Root = styled.div`
  background: black;
  color: white;
`;

export default function RightAlignedTimeline() {
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  return (
    <Root>
      <Timeline align="alternate">
        {data.map((item) => (
          <TimelineRow content={item.label} label={item.year} />
        ))}
      </Timeline>
    </Root>
  );
}

const data = [
  { id: 1, year: 2014, label: "사이버보안학과 창립" },
  { id: 2, year: 2014, label: "1대 학생회 출범" },
  { id: 3, year: 2014, label: "1대 학술제 운영" },
  { id: 4, year: 2015, label: "보안 운영상장 표창" },
  { id: 5, year: 2016, label: "인재상 등국" },
  { id: 6, year: 2017, label: "첫 사이버 안전 훈련센터 이수" },
  { id: 7, year: 2017, label: "ddos 공격 성립" },
  { id: 8, year: 2018, label: "LOCS 설립" },
  { id: 9, year: 2019, label: "BOB 1대 합격" },
  { id: 10, year: 2020, label: "소마 합격" },
  { id: 1, year: 2014, label: "사이버보안학과 창립" },
  { id: 2, year: 2014, label: "1대 학생회 출범" },
  { id: 3, year: 2014, label: "1대 학술제 운영" },
  { id: 4, year: 2015, label: "보안 운영상장 표창" },
  { id: 5, year: 2016, label: "인재상 등국" },
  { id: 6, year: 2017, label: "첫 사이버 안전 훈련센터 이수" },
  { id: 7, year: 2017, label: "ddos 공격 성립" },
  { id: 8, year: 2018, label: "LOCS 설립" },
  { id: 9, year: 2019, label: "BOB 1대 합격" },
  { id: 10, year: 2020, label: "소마 합격" },
  { id: 1, year: 2014, label: "사이버보안학과 창립" },
  { id: 2, year: 2014, label: "1대 학생회 출범" },
  { id: 3, year: 2014, label: "1대 학술제 운영" },
  { id: 4, year: 2015, label: "보안 운영상장 표창" },
  { id: 5, year: 2016, label: "인재상 등국" },
  { id: 6, year: 2017, label: "첫 사이버 안전 훈련센터 이수" },
  { id: 7, year: 2017, label: "ddos 공격 성립" },
  { id: 8, year: 2018, label: "LOCS 설립" },
  { id: 9, year: 2019, label: "BOB 1대 합격" },
  { id: 10, year: 2020, label: "소마 합격" },
];
