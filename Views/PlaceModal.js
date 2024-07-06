import React,{ useState } from "react";

import { Center,Button,ButtonText,Modal,Input,InputField,
        ModalBackdrop,ModalBody,ModalContent,ModalHeader,
        ModalFooter,ModalCloseButton,Heading,Text,Icon,
        Select,SelectTrigger,SelectInput,SelectIcon,SelectPortal,
        SelectBackdrop,SelectContent,Switch,HStack,
        SelectDragIndicatorWrapper,SelectItem,SelectDragIndicator} from "@gluestack-ui/themed";
import { CloseIcon,ChevronDownIcon } from "@gluestack-ui/themed";

export default function PlaceModal({ modalVisible, setModalVisible }) {
    const [timeReserve, setTimeReserve] = useState(false)

    const ref = React.useRef(null)
    return (
      <Center h={300}>
        <Modal
          isOpen={modalVisible}
          onClose={() => {
            setModalVisible(false)
          }}
          finalFocusRef={ref}
        >
          <ModalBackdrop />
          <ModalContent>
            <ModalHeader>
              <Heading size="lg">添加计划</Heading>
              <ModalCloseButton>
                <Icon as={CloseIcon} />
              </ModalCloseButton>
            </ModalHeader>
            <ModalBody>
            <Input
                variant="underlined"
                size="md"
                mb={"$3"}
                >
                <InputField placeholder="输入待办事项" />
            </Input>
            {!timeReserve && (
                          <Select >
                          <SelectTrigger variant="outline" size="md">
                              <SelectInput placeholder="专注时间" />
                              <SelectIcon mr="$3">
                              <Icon as={ChevronDownIcon} />
                              </SelectIcon>
                          </SelectTrigger>
                          <SelectPortal>
                              <SelectBackdrop />
                              <SelectContent>
                              <SelectDragIndicatorWrapper>
                                  <SelectDragIndicator />
                              </SelectDragIndicatorWrapper>
                              <SelectItem label="25分钟" value="25" />
                              <SelectItem label="35分钟" value="35" />
                              </SelectContent>
                          </SelectPortal>
                      </Select>
            )}
            <HStack  mt={"$3"}  space="md">
              <Switch value={timeReserve} onToggle={() => setTimeReserve(!timeReserve)}/>
              <Text pt={"$1"} size="sm">正计时</Text>
            </HStack>
            </ModalBody>
            <ModalFooter>
              <Button
                variant="outline"
                size="sm"
                action="secondary"
                mr="$3"
                onPress={() => {
                  setModalVisible(false)
                }}
              >
                <ButtonText>取消</ButtonText>
              </Button>
              <Button
                size="sm"
                action="positive"
                borderWidth="$0"
                onPress={() => {
                  setModalVisible(false)
                }}
              >
                <ButtonText>添加</ButtonText>
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Center>
    )
  }