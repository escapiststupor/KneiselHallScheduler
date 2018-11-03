import styled from 'styled-components';
import { space } from 'styled-system';
import { colors } from '../style-variables';

export const Card = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 360px;
  margin: 16px;
  padding: 16px;
  background-color: ${colors.lv2Bg};
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  position: relative;
  word-wrap: break-word;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;

  > * + * {
    margin-top: 16px;
  }
`;

export const Title = styled.div`
  font-size: 1rem;
  padding: 8px;
  line-height: 1.4;
  color: ${colors.darkGray};
  font-weight: bold;
  ${space};
`;

export const GroupName = styled.div`
  font-size: 1.1rem;
  padding: 0.4rem;
  color: ${colors.darkGray};
  ${space};
`;

export const GroupContainer = styled.div`
  font-family: monospace;
  background-color: ${colors.lv2Bg};
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  border: 1px solid rgba(0, 0, 0, 0.125);
  padding: 1rem;
  margin: 1rem;
  ${space};
`;

export const CoachLabel = styled.div`
  font-size: 1rem;
  padding: 0.4rem;
  color: ${colors.brown};
  ${space};

  &::before {
    content: 'coach: ';
  }
`;

export const TimeSlotLabel = styled.div`
  font-size: 1rem;
  color: ${colors.hint};
  ${space};
`;

export const RoomLabel = styled.div`
  font-size: 0.8rem;
  color: ${colors.content};
  margin: 4px;
  padding: 4px;
  ${space};

  &::before {
    content: 'room:';
  }
`;

export const MemberLabel = styled.span`
  display: inline-block;
  padding: 0.2rem;
  line-height: 1.2rem;
  font-family: monospace;
  background-color: ${colors.yellow}

  font-size: small;
  border-radius: 2px;
  box-shadow: inset 0 -1px 0 rgba(27, 31, 35, 0.12);

  &:not(:last-child) {
    margin-right: 8px;
  }
`;

export const Error = styled.div`
  color: ${colors.red};
  padding: 8px;
  font-size: 1rem;
`;

export const TopRightIcon = styled.div`
  position: absolute;
  padding: 4px;
  top: 0;
  right: 0;
  cursor: pointer;
`;

export const MemberManagement = styled.div`
  height: 240px;
  width: 90%;
  overflow: scroll;
  background-color: ${colors.bg};
  border: 1px solid rgba(0, 0, 0, 0.125);
  ${space} > p {
    border-bottom: 1px solid rgba(0, 0, 0, 0.125);
  }
`;
