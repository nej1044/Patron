import { useQuery } from '@apollo/client';
import * as React from 'react';
import { FETCH_USEDITEM_QUESTIONS } from './HomeLetter.queries';
import HomeLetterUI from './HomeLetter.presenter';
import { IPropsHomeLetter } from './HomeLetter.types';

export default function HomeLetter(props: IPropsHomeLetter) {
  const { data } = useQuery(FETCH_USEDITEM_QUESTIONS, {
    variables: {
      useditemId: props.route.params?.useditemId,
    },
  });

  return (
    <>
      <HomeLetterUI data={data} useditemId={props.route.params?.useditemId} />
    </>
  );
}
