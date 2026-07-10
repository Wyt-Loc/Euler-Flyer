# hwdef 配置手册

## 1. 从 hwdef.dat 到 hwdef.h：ArduPilot 硬件配置编译流程

### 1.1  Bootloader 对于芯片相关配置

```shell
# hw definition file for processing by chibios_hwdef.py
# for the MicoAir743 hardware

# MCU class and specific type
# 指定芯片系列与具体型号，决定引脚数量、时钟树、Flash 布局、ChibiOS 底层驱动等。
MCU STM32H7xx STM32H743xx

# board ID for firmware load
# 板卡唯一 ID（数值 1179，见 Tools/AP_Bootloader/board_types.txt）。刷固件时 Bootloader 用它校验 .apj 是否匹配本板，防止刷错固件。
APJ_BOARD_ID AP_HW_MicoAir743v2

# crystal frequency
# 外部晶振 8 MHz，用于配置系统时钟（PLL 倍频等）。必须与硬件一致，否则 UART/USB 波特率会错。
OSCILLATOR_HZ 8000000

# flash size
# 片内 Flash 共 2 MB
FLASH_SIZE_KB 2048

# bootloader is installed at zero offset
# Bootloader 自身从 Flash 起始地址 0x08000000 开始存放，不预留前部空间。
FLASH_RESERVE_START_KB 0

# the location where the bootloader will put the firmware
# 主固件加载起始偏移为 128 KB（0x08020000）。前 128 KB 留给 Bootloader；刷机工具/APJ 会把应用固件写到这个地址。
# 0x08000000 ─────────────────────────────
#            │  Bootloader (0 ~ 128 KB)    │
# 0x08020000 ─────────────────────────────
#            │  主固件 ArduPilot           │
#            │  ...                         │
# 0x08200000 ─────────────────────────────  (2MB 末尾)
FLASH_BOOTLOADER_LOAD_KB 128

# order of UARTs (and USB)
# 定义 Bootloader 可见的串口编号顺序：SERIAL0 = USB，SERIAL1 = USART1。刷机工具（Mission Planner、QGC、apj_tool）通过 USB 或 UART1 与 Bootloader 通信时依赖此映射。
SERIAL_ORDER OTG1 USART1

# USB
# USB Full-Speed 的 D-/D+，用于 USB 刷机与识别。
PA11 OTG_FS_DM OTG1
PA12 OTG_FS_DP OTG1

# USART1
# 备用串口刷机通道（部分板子用外接 USB-TTL 接 TX/RX）。Bootloader 只需最少通信口，因此只配 USB + USART1。
PA9  USART1_TX USART1
PA10 USART1_RX USART1

# pins for SWD debugging
# ARM SWD 调试接口。用 ST-Link、J-Link 等烧录或调试 Bootloader/固件时需要。在 hwdef 中声明后，生成正确的 GPIO 模式（含上拉/下拉），避免被误配为普通 IO。
PA13 JTMS-SWDIO SWD
PA14 JTCK-SWCLK SWD

# CS pins
# 双 IMU（BMI088 加速度计/陀螺仪）的 SPI 片选。
PD5  BMI088_G_CS     CS
PD4  BMI088_A_CS     CS
# 第三颗 IMU 的片选。
PA15 BMI270_CS       CS
# OSD 芯片片选。
PB12 AT7456E_CS      CS

# LEDs
PE2 LED_ACTIVITY   OUTPUT LOW #green 活动指示灯
PE4 LED_BOOTLOADER OUTPUT LOW #blue Bootloader 模式指示灯
define HAL_LED_ON 0
```

### 1.2  硬件相关内容

```shell
# hw definition file for processing by chibios_hwdef.py
# for the MicoAir743v2 hardware

# MCU class and specific type
# 指定芯片系列与具体型号，决定引脚数量、时钟树、Flash 布局、ChibiOS 底层驱动等。
MCU STM32H7xx STM32H743xx

# board ID for firmware load
# 板卡 ID（数值 1179），刷机时校验固件是否匹配
APJ_BOARD_ID AP_HW_MicoAir743v2

# crystal frequency
# 外部晶振 8 MHz，用于系统时钟配置
OSCILLATOR_HZ 8000000

# ChibiOS system timer
# ChibiOS 系统节拍用 TIM12，分辨率 16 位。影响 RTOS 调度、延时等底层时基。
STM32_ST_USE_TIMER 12
define CH_CFG_ST_RESOLUTION 16

# flash size
# 片内 Flash 2 MB
FLASH_SIZE_KB 2048
# 主固件从 128 KB 处开始，前 128 KB 留给 Bootloader
FLASH_RESERVE_START_KB 128
# 参数存储区 32 KB
define HAL_STORAGE_SIZE 32768
# 参数存在 Flash 第 14 页（H743 每页 128 KB，通常在 Flash 末尾）
STORAGE_FLASH_PAGE 14

# default to all pins low to avoid ESD issues
# 未在 hwdef 中声明的引脚，上电时默认为输出低 + 下拉，降低静电和浮空引脚风险
DEFAULTGPIO OUTPUT LOW PULLDOWN

# order of UARTs (and USB)
# 逻辑串口编号与物理接口的对应关系
SERIAL_ORDER  OTG1 USART1 USART2 USART3 UART4 UART5 USART6 UART7 UART8

# USB
PA11 OTG_FS_DM OTG1
PA12 OTG_FS_DP OTG1

# UARTs
PA9  USART1_TX USART1
PA10 USART1_RX USART1
PA2  USART2_TX USART2
PA3  USART2_RX USART2
PD8  USART3_TX USART3
PD9  USART3_RX USART3
PA0  UART4_TX  UART4
PA1  UART4_RX  UART4
PB6  UART5_TX  UART5
PB5  UART5_RX  UART5
PC6  USART6_TX USART6
PC7  USART6_RX USART6
PE8  UART7_TX  UART7
PE7  UART7_RX  UART7
PE1  UART8_TX  UART8
PE0  UART8_RX  UART8

# SWD
# PA13/PA14 为 SWD 调试接口，供 ST-Link 等烧录和调试
PA13 JTMS-SWDIO SWD
PA14 JTCK-SWCLK SWD

# order of I2C
# I2C_ORDER I2C2 I2C1 表示 I2C:0 = I2C2，I2C:1 = I2C1。后面 BARO SPL06 I2C:0:0x77 即气压计接在 I2C2 上。
I2C_ORDER I2C2 I2C1

# I2C
# 外部 I2C
PB8  I2C1_SCL I2C1
PB9  I2C1_SDA I2C1
# 内部 I2C（气压计等）
PB10 I2C2_SCL I2C2
PB11 I2C2_SDA I2C2

# PWM
PE14 TIM1_CH4  TIM1  PWM(1)  GPIO(50) BIDIR # BIDIR（支持双向 DShot）
PE13 TIM1_CH3  TIM1  PWM(2)  GPIO(51)
PE11 TIM1_CH2  TIM1  PWM(3)  GPIO(52) BIDIR # BIDIR（支持双向 DShot）
PE9  TIM1_CH1  TIM1  PWM(4)  GPIO(53)
PB1  TIM3_CH4  TIM3  PWM(5)  GPIO(54) BIDIR # BIDIR（支持双向 DShot）
PB0  TIM3_CH3  TIM3  PWM(6)  GPIO(55)
PD12 TIM4_CH1  TIM4  PWM(7)  GPIO(56) BIDIR # BIDIR（支持双向 DShot）
PD13 TIM4_CH2  TIM4  PWM(8)  GPIO(57)
PE5  TIM15_CH1 TIM15 PWM(9)  GPIO(58)
PE6  TIM15_CH2 TIM15 PWM(10) GPIO(59)

# LED-pad
PD14 TIM4_CH3  TIM4  PWM(11) GPIO(60) #M11 LED 焊盘，可作辅助输出

# BUZZER
PD15 BUZZER OUTPUT GPIO(61) LOW
define HAL_BUZZER_PIN 61

# 11 PWM available by default
define BOARD_PWM_COUNT_DEFAULT 11

# LEDs
PE3 LED_RED   OUTPUT LOW GPIO(0)
PE2 LED_GREEN OUTPUT LOW GPIO(1)
PE4 LED_BLUE  OUTPUT LOW GPIO(2)

define AP_NOTIFY_GPIO_LED_RGB_RED_PIN 0
define AP_NOTIFY_GPIO_LED_RGB_GREEN_PIN 1
define AP_NOTIFY_GPIO_LED_RGB_BLUE_PIN 2

define AP_NOTIFY_GPIO_LED_RGB_ENABLED 1 # 启用 RGB LED 通知

# ADC for Power
PC0 BATT_VOLTAGE_SENS ADC1 SCALE(1)   # VOLT_SCALE 分压换算系数
PC1 BATT_CURRENT_SENS ADC1 SCALE(1)   # CURR_SCALE 采样电阻的换算系数

# setup for battery
define HAL_BATT_MONITOR_DEFAULT 4  # HAL_BATT_MONITOR_DEFAULT 4 表示默认使用电压+电流监测
define HAL_BATT_VOLT_PIN 10
define HAL_BATT_CURR_PIN 11
define HAL_BATT_VOLT_SCALE 21.12
define HAL_BATT_CURR_SCALE 40.2

# compass
define HAL_COMPASS_DISABLE_QMC5883L_INTERNAL_PROBE  # 禁用 QMC5883L 内部探测
define HAL_PROBE_EXTERNAL_I2C_COMPASSES # 启用外部 I2C 罗盘探测
COMPASS QMC5883L I2C:ALL_EXTERNAL:0x0D true  ROTATION_NONE # 声明两颗 QMC5883L：一颗外部、一颗内部
COMPASS QMC5883L I2C:ALL_INTERNAL:0x0D false ROTATION_NONE # （true/false 表示是否外部总线）

# microSD support
PC12 SDMMC1_CK  SDMMC1
PD2  SDMMC1_CMD SDMMC1
PC8  SDMMC1_D0  SDMMC1
PC9  SDMMC1_D1  SDMMC1
PC10 SDMMC1_D2  SDMMC1
PC11 SDMMC1_D3  SDMMC1
define FATFS_HAL_DEVICE SDCD1  # FATFS_HAL_DEVICE 启用 FatFS，用于日志、任务、参数文件等。

# SPI1 - OSD
PA5  SPI1_SCK        SPI1
PA6  SPI1_MISO       SPI1
PA7  SPI1_MOSI       SPI1
PB12 AT7456E_CS      CS

# SPI2 - BMI088
PD3  SPI2_SCK        SPI2
PC2  SPI2_MISO       SPI2
PC3  SPI2_MOSI       SPI2
PD5  BMI088_G_CS     CS
PD4  BMI088_A_CS     CS
PC15 DRDY1_BMI088_G  INPUT
PC14 DRDY2_BMI088_A  INPUT

# SPI3
PB3  SPI3_SCK      SPI3
PB4  SPI3_MISO     SPI3
PD6  SPI3_MOSI     SPI3
PA15 BMI270_CS     CS
PB7  DRDY3_BMI270  INPUT

# SPI devices
SPIDEV  bmi088_a  SPI2  DEVID1  BMI088_A_CS  MODE3  10*MHZ 10*MHZ
SPIDEV  bmi088_g  SPI2  DEVID2  BMI088_G_CS  MODE3  10*MHZ 10*MHZ
SPIDEV  bmi270    SPI3  DEVID3  BMI270_CS    MODE3   1*MHZ 10*MHZ
SPIDEV  osd       SPI1  DEVID4  AT7456E_CS   MODE0  10*MHZ 10*MHZ

# 2 IMUs
IMU BMI088 SPI:bmi088_a SPI:bmi088_g ROTATION_ROLL_180_YAW_270 # 相对飞控板的安装方向
IMU BMI270 SPI:bmi270 ROTATION_ROLL_180 # 相对飞控板的安装方向

# barometers
BARO SPL06 I2C:0:0x77  # 接 I2C2（I2C:0），地址 0x77

# enable FAT filesystem support (needs a microSD defined via SDMMC)
define HAL_OS_FATFS_IO 1 # 启用 FatFS

# setup for serial ports # 配置默认功能
define DEFAULT_SERIAL2_PROTOCOL SerialProtocol_MSP_DisplayPort
define DEFAULT_SERIAL4_PROTOCOL SerialProtocol_MAVLink2
define DEFAULT_SERIAL6_PROTOCOL SerialProtocol_RCIN
define DEFAULT_SERIAL7_PROTOCOL SerialProtocol_ESCTelemetry
define DEFAULT_SERIAL8_PROTOCOL SerialProtocol_MAVLink2
define DEFAULT_SERIAL8_BAUD 115

# setup for OSD
define OSD_ENABLED 1
define HAL_OSD_TYPE_DEFAULT 1
ROMFS_WILDCARD libraries/AP_OSD/fonts/font*.bin

# setup for BF migration
define HAL_FRAME_TYPE 12 # 默认机架类型
```

### 1.3   [chibios_hwdef.py](https://github.com/ArduPilot/ardupilot/blob/master/libraries/AP_HAL_ChibiOS/hwdef/scripts/chibios_hwdef.py)

chibios_hwdef.py是 ArduPilot ChibiOS 平台的硬件定义编译器：把可读的 `hwdef.dat` / `hwdef-bl.dat` 翻译成 C 头文件、链接脚本和构建环境变量，供固件编译使用。每次 `waf configure` / `waf copter` 等构建时，会针对目标板卡调用该脚本。 `MicoAir743v2/hwdef.dat` 不会直接参与编译，而是先被这个脚本“编译”成 `hwdef.h` 等产物。
