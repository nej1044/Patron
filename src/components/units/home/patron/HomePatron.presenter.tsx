import * as React from 'react';
import { Image, ScrollView } from 'react-native';
import * as E from './HomePatron.styles';
import ColoredTag from '../../../commons/tags/coloredtag';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import ViewMoreButton from '../../../commons/buttons/viewmorebutton';

export default function HomePatronUI(props) {
  return (
    <>
      <ScrollView>
        <E.Wrapper>
          <E.SelectionWrapper>
            <E.SelectionTitle>
              <E.SelectionTitleText>정기 후원</E.SelectionTitleText>
              <ViewMoreButton onPressBtn={() => props.navigation.navigate('patronList')} />
            </E.SelectionTitle>
            <E.SelectionList>
              <ScrollView horizontal={true}>
                {props.data?.fetchUseditems
                  .map((el) => (
                    <E.Card key={el._id}>
                      <E.ImgWrapper
                        onPress={() =>
                          props.navigation.navigate('homeDetails', { useditemId: el._id })
                        }
                      >
                        <Image
                          style={{ width: 277, height: 150, borderRadius: 8 }}
                          source={{
                            uri: `https://${el.images[0]}`,
                          }}
                        />
                        <LinearGradient
                          colors={['rgba(0, 0, 0, 0.42)', 'rgba(255,255,255,0)']}
                          style={{
                            width: '100%',
                            height: '100%',
                            position: 'absolute',
                            borderRadius: 8,
                          }}
                          start={{ x: 0, y: 1 }}
                          end={{ x: 0, y: 0 }}
                        ></LinearGradient>
                        <E.CardTag>
                          <ColoredTag
                            key={el._id}
                            text={`#${el.tags[0]}`}
                            fontSize={'9px'}
                            padding={'2px 4px 2px 4px'}
                          />
                        </E.CardTag>
                      </E.ImgWrapper>
                      <E.CardDetails>
                        <E.DetailsContent>
                          <E.ContentTitle>{el.name.split('/')[1]}</E.ContentTitle>
                          <E.ContentRemark numberOfLines={1} ellipsizeMode="tail">
                            {el.remarks}
                          </E.ContentRemark>
                        </E.DetailsContent>
                        <E.DetailsBookmark>
                          <Icon name="bookmark-outline" size={20} color={'rgba(0, 0, 0, 0.4)'} />
                        </E.DetailsBookmark>
                      </E.CardDetails>
                    </E.Card>
                  ))
                  .slice(0, 3)}
              </ScrollView>
            </E.SelectionList>
          </E.SelectionWrapper>

          <E.RecommendWrapper>
            <E.RecommendTitle>
              <E.RecommendTitleText>
                <E.UserName>김이웃</E.UserName>님과 어울리는 정기후원이에요!
              </E.RecommendTitleText>
            </E.RecommendTitle>

            <E.RecommendList>
              {/* <FlatList
              data={recommendListItems}
              renderItem={(items) => ( */}
              {props.data?.fetchUseditems
                .map((el) => (
                  <E.RecommendCard key={el._id}>
                    <E.RImageWrpper
                      onPress={() =>
                        props.navigation.navigate('homeDetails', { useditemId: el._id })
                      }
                    >
                      <Image
                        style={{ width: 160, height: 160, borderRadius: 8 }}
                        source={{
                          uri: `https://${el.images[0]}`,
                        }}
                      />
                      <E.CardTag>
                        <ColoredTag
                          key={el._id}
                          text={`#${el.tags[0]}`}
                          fontSize={'9px'}
                          padding={'2px 4px 2px 4px'}
                        />
                      </E.CardTag>
                    </E.RImageWrpper>
                    <E.RecommendCardDetails>
                      <E.RecommendCardTitle>{el.name.split('/')[1]}</E.RecommendCardTitle>
                      <E.RecommendBookmark>
                        <Icon name="bookmark-outline" size={20} color={'rgba(0, 0, 0, 0.4)'} />
                      </E.RecommendBookmark>
                    </E.RecommendCardDetails>
                  </E.RecommendCard>
                ))
                .slice(0, 4)}
            </E.RecommendList>
          </E.RecommendWrapper>
        </E.Wrapper>
      </ScrollView>
    </>
  );
}