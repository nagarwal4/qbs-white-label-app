// Copyright 2023 Quantoz Technology B.V. and contributors. Licensed
// under the Apache License, Version 2.0. See the NOTICE file at the root
// of this distribution or at http://www.apache.org/licenses/LICENSE-2.0

import { Button, Heading, VStack } from "native-base";
import { Fragment } from "react";
import { useOwnedTokens } from "../api/tokens/tokens";
import AssetsListSkeleton from "../screens/skeletons/AssetsListSkeleton";
import { ImageIdentifier } from "../utils/images";
import AssetListItem from "./AssetListItem";
import FullScreenMessage from "./FullScreenMessage";
import NoMoreButton from "./NoMoreButton";
import ScreenWrapper from "./ScreenWrapper";

function OwnedAssetsList() {
  const { data, status, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useOwnedTokens();

  if (status === "error") {
    return (
      <FullScreenMessage
        message="Error loading assets"
        icon={null}
        illustration={ImageIdentifier.Find}
      />
    );
  }

  if (status === "loading") {
    return <AssetsListSkeleton />;
  }

  if (data.pages[0].value.length === 0) {
    return (
      <ScreenWrapper flex={1}>
        <FullScreenMessage
          message="No owned assets to show"
          icon={null}
          illustration={ImageIdentifier.Loading}
        />
      </ScreenWrapper>
    );
  }

  return (
    <VStack space={2} marginBottom={8}>
      <Heading size="xs" textTransform="uppercase">
        Owned assets
      </Heading>
      {data.pages.map((page, i) => (
        <Fragment key={i}>
          {page.value.map((asset) => (
            <AssetListItem key={asset.code} asset={asset} />
          ))}
        </Fragment>
      ))}
      {!hasNextPage ? (
        <NoMoreButton entityName="assets" />
      ) : (
        <Button
          size="sm"
          isDisabled={isFetchingNextPage}
          onPress={() => fetchNextPage()}
        >
          {isFetchingNextPage ? "Loading more..." : "Load more"}
        </Button>
      )}
    </VStack>
  );
}

export default OwnedAssetsList;