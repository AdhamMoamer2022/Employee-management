USE [master]
GO
/****** Object:  Database [InterActive]    Script Date: 12/09/2022 3:14:42 AM ******/
CREATE DATABASE [InterActive]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'InterActive', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\InterActive.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'InterActive_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\InterActive_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [InterActive] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [InterActive].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [InterActive] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [InterActive] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [InterActive] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [InterActive] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [InterActive] SET ARITHABORT OFF 
GO
ALTER DATABASE [InterActive] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [InterActive] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [InterActive] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [InterActive] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [InterActive] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [InterActive] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [InterActive] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [InterActive] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [InterActive] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [InterActive] SET  DISABLE_BROKER 
GO
ALTER DATABASE [InterActive] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [InterActive] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [InterActive] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [InterActive] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [InterActive] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [InterActive] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [InterActive] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [InterActive] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [InterActive] SET  MULTI_USER 
GO
ALTER DATABASE [InterActive] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [InterActive] SET DB_CHAINING OFF 
GO
ALTER DATABASE [InterActive] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [InterActive] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [InterActive] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [InterActive] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [InterActive] SET QUERY_STORE = OFF
GO
USE [InterActive]
GO
/****** Object:  User [Adham]    Script Date: 12/09/2022 3:14:42 AM ******/
CREATE USER [Adham] FOR LOGIN [Adham] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  Table [dbo].[Departments]    Script Date: 12/09/2022 3:14:42 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Departments](
	[DepartmentId] [smallint] IDENTITY(1,1) NOT NULL,
	[DepartmentName] [varchar](50) NULL,
	[DepartmentDescription] [varchar](200) NULL,
	[DepartmentPhone] [varchar](15) NULL,
	[DepartmentEmail] [varchar](50) NULL,
	[DepartmentAddress] [varchar](50) NULL,
	[Status] [bit] NOT NULL,
	[CreatedBy] [int] NULL,
	[CreatedDate] [datetime] NULL,
	[IsDeleted] [bit] NULL,
 CONSTRAINT [PK_Departments] PRIMARY KEY CLUSTERED 
(
	[DepartmentId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Employees]    Script Date: 12/09/2022 3:14:42 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Employees](
	[EmployeeId] [int] IDENTITY(1,1) NOT NULL,
	[FirstName] [varchar](50) NULL,
	[LastName] [varchar](50) NULL,
	[DepartmentId] [smallint] NOT NULL,
	[Salary] [int] NULL,
	[Balance] [int] NULL,
	[HireDate] [datetime] NULL,
	[Position] [smallint] NULL,
	[CellPhone] [varchar](15) NULL,
	[Email] [varchar](50) NULL,
	[Address] [varchar](50) NULL,
	[Status] [bit] NOT NULL,
	[CreatedDate] [datetime] NULL,
	[CreatedBy] [int] NULL,
	[IsDeleted] [bit] NULL,
 CONSTRAINT [PK_Employees] PRIMARY KEY CLUSTERED 
(
	[EmployeeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[EmployeeVacations]    Script Date: 12/09/2022 3:14:42 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[EmployeeVacations](
	[EmployeeVacationId] [int] IDENTITY(1,1) NOT NULL,
	[EmployeeId] [int] NOT NULL,
	[VacationTypeId] [smallint] NOT NULL,
	[StartDate] [datetime] NOT NULL,
	[EndDate] [datetime] NOT NULL,
	[CreatedDate] [datetime] NULL,
	[CreatedBy] [int] NULL,
	[ApprovedBy] [int] NULL,
	[ApprovedDate] [datetime] NULL,
 CONSTRAINT [PK_Employees_Vacations] PRIMARY KEY CLUSTERED 
(
	[EmployeeVacationId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[VacationTypes]    Script Date: 12/09/2022 3:14:42 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[VacationTypes](
	[VacationTypeId] [smallint] IDENTITY(1,1) NOT NULL,
	[VacationType] [varchar](50) NOT NULL,
	[MaximumAlowedDays] [smallint] NULL,
	[Status] [bit] NOT NULL,
	[Description] [varchar](200) NULL,
	[DailyDeductionPercentage] [smallint] NULL,
	[CreatedBy] [int] NULL,
	[CreatedDate] [datetime] NULL,
 CONSTRAINT [PK_VacationTypes] PRIMARY KEY CLUSTERED 
(
	[VacationTypeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Departments] ON 
GO
INSERT [dbo].[Departments] ([DepartmentId], [DepartmentName], [DepartmentDescription], [DepartmentPhone], [DepartmentEmail], [DepartmentAddress], [Status], [CreatedBy], [CreatedDate], [IsDeleted]) VALUES (1, N'Software Development', N'Information Technology', N'(+971) 3564100', N'SoftwareDevelopers@InterActive.com', N'Dubai Silicon Oasis, Le Solarium Building, Office ', 0, 1, CAST(N'1995-01-01T00:00:00.000' AS DateTime), 0)
GO
INSERT [dbo].[Departments] ([DepartmentId], [DepartmentName], [DepartmentDescription], [DepartmentPhone], [DepartmentEmail], [DepartmentAddress], [Status], [CreatedBy], [CreatedDate], [IsDeleted]) VALUES (2, N'Quality Assurance', N'Information Technology', N'(+971) 3564100', N'QA@InterActive.com', N'Dubai Silicon Oasis, Le Solarium Building, Office ', 1, 1, CAST(N'1995-01-01T00:00:00.000' AS DateTime), 0)
GO
INSERT [dbo].[Departments] ([DepartmentId], [DepartmentName], [DepartmentDescription], [DepartmentPhone], [DepartmentEmail], [DepartmentAddress], [Status], [CreatedBy], [CreatedDate], [IsDeleted]) VALUES (3, N'UI/UX', N'test', N'12356', N'UI@testcom', N'UI section ', 1, 1, CAST(N'2022-09-12T00:01:52.250' AS DateTime), 0)
GO
SET IDENTITY_INSERT [dbo].[Departments] OFF
GO
SET IDENTITY_INSERT [dbo].[Employees] ON 
GO
INSERT [dbo].[Employees] ([EmployeeId], [FirstName], [LastName], [DepartmentId], [Salary], [Balance], [HireDate], [Position], [CellPhone], [Email], [Address], [Status], [CreatedDate], [CreatedBy], [IsDeleted]) VALUES (1, N'Adham', N'Moamer', 1, 12000, 18, CAST(N'2022-10-10T00:00:00.000' AS DateTime), 0, N'00971524787892', N'Adham1s2a@gmail.com', N'Dubai-Al Barsha1', 1, CAST(N'2022-09-10T17:09:48.553' AS DateTime), 1, 0)
GO
INSERT [dbo].[Employees] ([EmployeeId], [FirstName], [LastName], [DepartmentId], [Salary], [Balance], [HireDate], [Position], [CellPhone], [Email], [Address], [Status], [CreatedDate], [CreatedBy], [IsDeleted]) VALUES (2, N'Mohamad', N'Mohamed', 1, 12000, 23, CAST(N'2022-09-12T20:00:00.000' AS DateTime), 1, N'123456789', N'test@test.com', N'test', 1, CAST(N'2022-09-11T18:25:46.470' AS DateTime), 1, NULL)
GO
INSERT [dbo].[Employees] ([EmployeeId], [FirstName], [LastName], [DepartmentId], [Salary], [Balance], [HireDate], [Position], [CellPhone], [Email], [Address], [Status], [CreatedDate], [CreatedBy], [IsDeleted]) VALUES (3, N'Adham1', N'test1', 1, 12000, 30, CAST(N'2022-09-12T20:00:00.000' AS DateTime), 1, N'123456789', N'test@test.com', N'test', 0, CAST(N'2022-09-11T18:27:06.550' AS DateTime), 1, 0)
GO
INSERT [dbo].[Employees] ([EmployeeId], [FirstName], [LastName], [DepartmentId], [Salary], [Balance], [HireDate], [Position], [CellPhone], [Email], [Address], [Status], [CreatedDate], [CreatedBy], [IsDeleted]) VALUES (4, N'Adham1', N'test1', 1, 12000, 30, CAST(N'2022-09-12T20:00:00.000' AS DateTime), 1, N'123456789', N'test@test.com', N'test', 0, CAST(N'2022-09-11T18:30:03.787' AS DateTime), 1, 0)
GO
INSERT [dbo].[Employees] ([EmployeeId], [FirstName], [LastName], [DepartmentId], [Salary], [Balance], [HireDate], [Position], [CellPhone], [Email], [Address], [Status], [CreatedDate], [CreatedBy], [IsDeleted]) VALUES (5, N'test', N'test', 3, 1243, 123, CAST(N'2022-09-13T20:00:00.000' AS DateTime), 1, N'32424', N'test@test', N'test', 1, CAST(N'2022-09-12T01:37:23.550' AS DateTime), 1, 0)
GO
INSERT [dbo].[Employees] ([EmployeeId], [FirstName], [LastName], [DepartmentId], [Salary], [Balance], [HireDate], [Position], [CellPhone], [Email], [Address], [Status], [CreatedDate], [CreatedBy], [IsDeleted]) VALUES (6, N'Adham8', N'sef', 2, 12000, 3, CAST(N'2022-09-20T20:00:00.000' AS DateTime), 1, N'23423423', N'test@test', N'test', 1, CAST(N'2022-09-12T02:44:02.823' AS DateTime), 1, 0)
GO
INSERT [dbo].[Employees] ([EmployeeId], [FirstName], [LastName], [DepartmentId], [Salary], [Balance], [HireDate], [Position], [CellPhone], [Email], [Address], [Status], [CreatedDate], [CreatedBy], [IsDeleted]) VALUES (7, N'adham test 5', N'test', 2, 12000, 8, CAST(N'2022-09-14T20:00:00.000' AS DateTime), 1, N'65476476', N'test@test.com', N'jh', 1, CAST(N'2022-09-12T03:02:25.743' AS DateTime), 1, 0)
GO
SET IDENTITY_INSERT [dbo].[Employees] OFF
GO
SET IDENTITY_INSERT [dbo].[EmployeeVacations] ON 
GO
INSERT [dbo].[EmployeeVacations] ([EmployeeVacationId], [EmployeeId], [VacationTypeId], [StartDate], [EndDate], [CreatedDate], [CreatedBy], [ApprovedBy], [ApprovedDate]) VALUES (1, 1, 20, CAST(N'2022-09-10T00:00:00.000' AS DateTime), CAST(N'2022-09-20T00:00:00.000' AS DateTime), CAST(N'2022-09-10T17:42:35.137' AS DateTime), 1, 1, CAST(N'2022-10-21T00:00:00.000' AS DateTime))
GO
INSERT [dbo].[EmployeeVacations] ([EmployeeVacationId], [EmployeeId], [VacationTypeId], [StartDate], [EndDate], [CreatedDate], [CreatedBy], [ApprovedBy], [ApprovedDate]) VALUES (5, 1, 20, CAST(N'2022-09-25T00:00:00.000' AS DateTime), CAST(N'2022-09-25T00:00:00.000' AS DateTime), CAST(N'2022-09-10T18:37:36.687' AS DateTime), 1, 1, CAST(N'2022-10-26T00:00:00.000' AS DateTime))
GO
INSERT [dbo].[EmployeeVacations] ([EmployeeVacationId], [EmployeeId], [VacationTypeId], [StartDate], [EndDate], [CreatedDate], [CreatedBy], [ApprovedBy], [ApprovedDate]) VALUES (6, 2, 20, CAST(N'2022-09-04T20:00:00.000' AS DateTime), CAST(N'2022-09-07T20:00:00.000' AS DateTime), CAST(N'2022-09-11T22:20:29.663' AS DateTime), 2, 1, CAST(N'2022-09-11T18:19:58.560' AS DateTime))
GO
INSERT [dbo].[EmployeeVacations] ([EmployeeVacationId], [EmployeeId], [VacationTypeId], [StartDate], [EndDate], [CreatedDate], [CreatedBy], [ApprovedBy], [ApprovedDate]) VALUES (7, 2, 11, CAST(N'2022-08-31T20:00:00.000' AS DateTime), CAST(N'2022-09-02T20:00:00.000' AS DateTime), CAST(N'2022-09-11T22:23:46.460' AS DateTime), 2, 1, CAST(N'2022-09-11T18:23:41.523' AS DateTime))
GO
INSERT [dbo].[EmployeeVacations] ([EmployeeVacationId], [EmployeeId], [VacationTypeId], [StartDate], [EndDate], [CreatedDate], [CreatedBy], [ApprovedBy], [ApprovedDate]) VALUES (8, 6, 11, CAST(N'2022-09-05T20:00:00.000' AS DateTime), CAST(N'2022-09-13T20:00:00.000' AS DateTime), CAST(N'2022-09-12T02:44:33.090' AS DateTime), 6, 1, CAST(N'2022-09-11T22:44:27.100' AS DateTime))
GO
INSERT [dbo].[EmployeeVacations] ([EmployeeVacationId], [EmployeeId], [VacationTypeId], [StartDate], [EndDate], [CreatedDate], [CreatedBy], [ApprovedBy], [ApprovedDate]) VALUES (9, 7, 11, CAST(N'2022-09-05T20:00:00.000' AS DateTime), CAST(N'2022-09-08T20:00:00.000' AS DateTime), CAST(N'2022-09-12T03:02:46.563' AS DateTime), 7, 1, CAST(N'2022-09-11T23:02:46.480' AS DateTime))
GO
SET IDENTITY_INSERT [dbo].[EmployeeVacations] OFF
GO
SET IDENTITY_INSERT [dbo].[VacationTypes] ON 
GO
INSERT [dbo].[VacationTypes] ([VacationTypeId], [VacationType], [MaximumAlowedDays], [Status], [Description], [DailyDeductionPercentage], [CreatedBy], [CreatedDate]) VALUES (11, N'Unpaid Leave', 45, 1, NULL, 100, 1, CAST(N'2022-09-10T00:00:00.000' AS DateTime))
GO
INSERT [dbo].[VacationTypes] ([VacationTypeId], [VacationType], [MaximumAlowedDays], [Status], [Description], [DailyDeductionPercentage], [CreatedBy], [CreatedDate]) VALUES (12, N'Sabbatical leave', 45, 1, NULL, 0, 1, CAST(N'2022-09-10T00:00:00.000' AS DateTime))
GO
INSERT [dbo].[VacationTypes] ([VacationTypeId], [VacationType], [MaximumAlowedDays], [Status], [Description], [DailyDeductionPercentage], [CreatedBy], [CreatedDate]) VALUES (13, N'Compensatory leave', 15, 1, NULL, 0, 1, CAST(N'2022-09-10T00:00:00.000' AS DateTime))
GO
INSERT [dbo].[VacationTypes] ([VacationTypeId], [VacationType], [MaximumAlowedDays], [Status], [Description], [DailyDeductionPercentage], [CreatedBy], [CreatedDate]) VALUES (14, N'Bereavement leave', 60, 1, NULL, 0, 1, CAST(N'2022-09-10T00:00:00.000' AS DateTime))
GO
INSERT [dbo].[VacationTypes] ([VacationTypeId], [VacationType], [MaximumAlowedDays], [Status], [Description], [DailyDeductionPercentage], [CreatedBy], [CreatedDate]) VALUES (15, N'Paternity leave', 10, 1, NULL, 0, 1, CAST(N'2022-09-10T00:00:00.000' AS DateTime))
GO
INSERT [dbo].[VacationTypes] ([VacationTypeId], [VacationType], [MaximumAlowedDays], [Status], [Description], [DailyDeductionPercentage], [CreatedBy], [CreatedDate]) VALUES (16, N'Maternity leave', 20, 1, NULL, 0, 1, CAST(N'2022-09-10T00:00:00.000' AS DateTime))
GO
INSERT [dbo].[VacationTypes] ([VacationTypeId], [VacationType], [MaximumAlowedDays], [Status], [Description], [DailyDeductionPercentage], [CreatedBy], [CreatedDate]) VALUES (17, N'Religious holidays', 5, 1, NULL, 0, 1, CAST(N'2022-09-10T00:00:00.000' AS DateTime))
GO
INSERT [dbo].[VacationTypes] ([VacationTypeId], [VacationType], [MaximumAlowedDays], [Status], [Description], [DailyDeductionPercentage], [CreatedBy], [CreatedDate]) VALUES (18, N'Public holiday', 15, 1, NULL, 0, 1, CAST(N'2022-09-10T00:00:00.000' AS DateTime))
GO
INSERT [dbo].[VacationTypes] ([VacationTypeId], [VacationType], [MaximumAlowedDays], [Status], [Description], [DailyDeductionPercentage], [CreatedBy], [CreatedDate]) VALUES (19, N'Casual leave', 15, 1, NULL, 0, 1, CAST(N'2022-09-10T00:00:00.000' AS DateTime))
GO
INSERT [dbo].[VacationTypes] ([VacationTypeId], [VacationType], [MaximumAlowedDays], [Status], [Description], [DailyDeductionPercentage], [CreatedBy], [CreatedDate]) VALUES (20, N'Sick leave', 30, 1, NULL, 25, 1, CAST(N'2022-09-10T00:00:00.000' AS DateTime))
GO
SET IDENTITY_INSERT [dbo].[VacationTypes] OFF
GO
ALTER TABLE [dbo].[Departments] ADD  CONSTRAINT [DF_Departments_DepartmentStatus]  DEFAULT ((1)) FOR [Status]
GO
ALTER TABLE [dbo].[Departments] ADD  CONSTRAINT [DF_Departments_CreatedDate]  DEFAULT (getdate()) FOR [CreatedDate]
GO
ALTER TABLE [dbo].[Departments] ADD  CONSTRAINT [DF_Departments_IsDeleted]  DEFAULT ((0)) FOR [IsDeleted]
GO
ALTER TABLE [dbo].[Employees] ADD  CONSTRAINT [DF_Employees_Status]  DEFAULT ((1)) FOR [Status]
GO
ALTER TABLE [dbo].[Employees] ADD  CONSTRAINT [DF_Employees_CreatedDate]  DEFAULT (getdate()) FOR [CreatedDate]
GO
ALTER TABLE [dbo].[Employees] ADD  CONSTRAINT [DF_Employees_IsDeleted]  DEFAULT ((0)) FOR [IsDeleted]
GO
ALTER TABLE [dbo].[EmployeeVacations] ADD  CONSTRAINT [DF_EmployeeVacations_CreatedDate]  DEFAULT (getdate()) FOR [CreatedDate]
GO
ALTER TABLE [dbo].[VacationTypes] ADD  CONSTRAINT [DF_VacationTypes_Status]  DEFAULT ((1)) FOR [Status]
GO
ALTER TABLE [dbo].[Employees]  WITH CHECK ADD  CONSTRAINT [FK_Employees_Departments] FOREIGN KEY([DepartmentId])
REFERENCES [dbo].[Departments] ([DepartmentId])
GO
ALTER TABLE [dbo].[Employees] CHECK CONSTRAINT [FK_Employees_Departments]
GO
ALTER TABLE [dbo].[EmployeeVacations]  WITH CHECK ADD  CONSTRAINT [FK_EmployeeVacations_Employees] FOREIGN KEY([EmployeeId])
REFERENCES [dbo].[Employees] ([EmployeeId])
GO
ALTER TABLE [dbo].[EmployeeVacations] CHECK CONSTRAINT [FK_EmployeeVacations_Employees]
GO
ALTER TABLE [dbo].[EmployeeVacations]  WITH CHECK ADD  CONSTRAINT [FK_EmployeeVacations_VacationTypes] FOREIGN KEY([VacationTypeId])
REFERENCES [dbo].[VacationTypes] ([VacationTypeId])
GO
ALTER TABLE [dbo].[EmployeeVacations] CHECK CONSTRAINT [FK_EmployeeVacations_VacationTypes]
GO
/****** Object:  StoredProcedure [dbo].[sp_Delete_Department]    Script Date: 12/09/2022 3:14:42 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[sp_Delete_Department]
@DepartmentId smallint
AS
BEGIN
Update Departments Set IsDeleted = 0 where  DepartmentId = @DepartmentId
END
GO
/****** Object:  StoredProcedure [dbo].[sp_Delete_Employee]    Script Date: 12/09/2022 3:14:42 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[sp_Delete_Employee]
@EmployeeId int
AS
BEGIN
Update Employees set IsDeleted = 0  WHERE EmployeeId = @EmployeeId
END
GO
/****** Object:  StoredProcedure [dbo].[sp_Get_Department]    Script Date: 12/09/2022 3:14:42 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[sp_Get_Department]
@DepartmentId smallint
AS
BEGIN
Select * FROM Departments WHERE DepartmentId = @DepartmentId
END
GO
/****** Object:  StoredProcedure [dbo].[sp_Get_Employee]    Script Date: 12/09/2022 3:14:42 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[sp_Get_Employee]
@EmployeeId int
AS
BEGIN
Select E.*,D.DepartmentName FROM Employees E inner join Departments D on E.DepartmentId = D.DepartmentId
WHERE E.EmployeeId = @EmployeeId
END
GO
/****** Object:  StoredProcedure [dbo].[sp_Get_VacationType]    Script Date: 12/09/2022 3:14:42 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_Get_VacationType]
    @VacationTypeId int
AS
BEGIN
    SET NOCOUNT ON;
    SELECT * FROM VacationTypes WHERE VacationTypeId = @VacationTypeId
END
GO
/****** Object:  StoredProcedure [dbo].[sp_GetList_Department]    Script Date: 12/09/2022 3:14:42 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[sp_GetList_Department]

AS
BEGIN
Select * FROM Departments where IsDeleted != 1
END
GO
/****** Object:  StoredProcedure [dbo].[sp_GetList_Employee]    Script Date: 12/09/2022 3:14:42 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[sp_GetList_Employee]

AS
BEGIN
Select E.*,D.DepartmentName FROM Employees E inner join Departments D on E.DepartmentId = D.DepartmentId 
where   E.IsDeleted !=1
END
GO
/****** Object:  StoredProcedure [dbo].[sp_GetList_EmployeeVacationPerMonth]    Script Date: 12/09/2022 3:14:42 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_GetList_EmployeeVacationPerMonth]
    @EmployeeId int,
    @Month int,
    @Year int
AS
BEGIN
    SET NOCOUNT ON;

    SELECT * FROM EmployeeVacations
    WHERE EmployeeId = @EmployeeId
    AND MONTH(EndDate) = @Month
    AND YEAR(EndDate) = @Year
END
GO
/****** Object:  StoredProcedure [dbo].[sp_GetList_EmployeeVacations]    Script Date: 12/09/2022 3:14:42 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_GetList_EmployeeVacations]
    @EmployeeId int
AS
BEGIN
    SET NOCOUNT ON;

    SELECT EV.* , V.VacationType  FROM EmployeeVacations EV inner join VacationTypes V 
	on EV.VacationTypeId =  V.VacationTypeId
    WHERE EV.EmployeeId = @EmployeeId

END
GO
/****** Object:  StoredProcedure [dbo].[sp_GetList_VacationType]    Script Date: 12/09/2022 3:14:42 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create PROCEDURE [dbo].[sp_GetList_VacationType]

AS
BEGIN
    SET NOCOUNT ON;
    SELECT * FROM VacationTypes
END
GO
/****** Object:  StoredProcedure [dbo].[sp_Insert_Department]    Script Date: 12/09/2022 3:14:42 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_Insert_Department]

    @DepartmentName nvarchar(50),
    @DepartmentDescription nvarchar(50),
    @DepartmentPhone nvarchar(50),
    @DepartmentEmail nvarchar(50),
    @DepartmentAddress nvarchar(50),
    @Status bit,
	@CreatedBy int,

	@DepartmentId int OUTPUT


AS
BEGIN
    SET NOCOUNT ON;
    INSERT INTO Departments (DepartmentName, DepartmentDescription, DepartmentPhone, DepartmentEmail, DepartmentAddress,[Status],CreatedBy) 
    VALUES (@DepartmentName, @DepartmentDescription, @DepartmentPhone, @DepartmentEmail, @DepartmentAddress, @Status,@CreatedBy)

	SET @DepartmentId = SCOPE_IDENTITY()
END
GO
/****** Object:  StoredProcedure [dbo].[sp_Insert_Employee]    Script Date: 12/09/2022 3:14:42 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_Insert_Employee]
    @FirstName nvarchar(50),
    @LastName nvarchar(50),
    @Email nvarchar(50),
    @DepartmentId nvarchar(50),
    @HireDate datetime,
    @CellPhone nvarchar(50),
    @Position nvarchar(50),
    @Salary money,
	@Balance int,
    @Address nvarchar(50),
    @Status nvarchar(50),
	@CreatedBy int,

    @EmployeeId int OUTPUT
AS
BEGIN
    SET NOCOUNT ON;
    INSERT INTO Employees (FirstName, LastName, Email, DepartmentId, HireDate, CellPhone, Position, Salary,Balance, [Address], [Status],CreatedBy) VALUES 
						  (@FirstName, @LastName, @Email, @DepartmentId, @HireDate, @CellPhone, @Position, @Salary,@Balance, @Address, @Status,@CreatedBy)
    SET @EmployeeId = SCOPE_IDENTITY()
END
GO
/****** Object:  StoredProcedure [dbo].[sp_Insert_EmployeeVacation]    Script Date: 12/09/2022 3:14:42 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[sp_Insert_EmployeeVacation]

    @EmployeeId int,
    @VacationTypeId smallint,
    @StartDate DateTime,
    @EndDate DateTime,
	@CreatedBy int,
	@ApprovedBy int,
	@ApprovedDate Datetime,
	@EmployeeVacationId int OUTPUT


AS
BEGIN
  Insert into EmployeeVacations (EmployeeId, VacationTypeId, StartDate, EndDate,CreatedBy,ApprovedBy,ApprovedDate)
    values (@EmployeeId, @VacationTypeId, @StartDate, @EndDate,@CreatedBy,@ApprovedBy,@ApprovedDate)

	   SET @EmployeeVacationId = SCOPE_IDENTITY()
    
END

GO
/****** Object:  StoredProcedure [dbo].[sp_Update_Department]    Script Date: 12/09/2022 3:14:42 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[sp_Update_Department]

    @DepartmentId int,
    @DepartmentName nvarchar(50),
    @DepartmentDescription nvarchar(50),
    @DepartmentPhone nvarchar(50),
    @DepartmentEmail nvarchar(50),
    @DepartmentAddress nvarchar(50),
    @Status bit,
	@CreatedBy int
AS
BEGIN
    UPDATE [dbo].[Departments]
    SET DepartmentName = @DepartmentName, DepartmentDescription = @DepartmentDescription,
	DepartmentPhone = @DepartmentPhone, DepartmentEmail = @DepartmentEmail, DepartmentAddress = @DepartmentAddress,
	[Status] = @Status,CreatedBy=@CreatedBy
    WHERE DepartmentId = @DepartmentId
END
GO
/****** Object:  StoredProcedure [dbo].[sp_Update_Employee]    Script Date: 12/09/2022 3:14:42 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_Update_Employee]
    @FirstName nvarchar(50),
    @LastName nvarchar(50),
    @Email nvarchar(50),
    @DepartmentId nvarchar(50),
    @HireDate datetime,
    @CellPhone nvarchar(50),
    @Position nvarchar(50),
    @Salary money,
	@Balance int,
    @Address nvarchar(50),
    @Status nvarchar(50),
	@CreatedBy int,
    @EmployeeId int
AS
BEGIN
    UPDATE Employees
    SET FirstName = @FirstName,
        LastName = @LastName,
        Email = @Email,
        DepartmentId = @DepartmentId,
        HireDate = @HireDate,
        CellPhone = @CellPhone,
        Position = @Position,
        Salary = @Salary,
		Balance=@Balance,
        [Address] = @Address,
        [Status] = @Status,
		CreatedBy=@CreatedBy

    WHERE EmployeeId = @EmployeeId
END
GO
/****** Object:  StoredProcedure [dbo].[sp_Update_EmployeeVacation]    Script Date: 12/09/2022 3:14:42 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_Update_EmployeeVacation]
    @EmployeeVacationId int,
    @EmployeeId int,
    @VacationTypeId int,
    @StartDate date,
    @EndDate date,
	@CreatedBy int,
	@ApprovedBy int, 
	@ApprovedDate Datetime
AS
BEGIN
    UPDATE [dbo].[EmployeeVacations]
    SET [EmployeeId] = @EmployeeId
        ,[VacationTypeId] = @VacationTypeId
        ,[StartDate] = @StartDate
        ,[EndDate] = @EndDate
		,CreatedBy=@CreatedBy
		,ApprovedBy=@ApprovedBy
		,ApprovedDate=@ApprovedDate

    WHERE [EmployeeVacationId] = @EmployeeVacationId
END
GO
USE [master]
GO
ALTER DATABASE [InterActive] SET  READ_WRITE 
GO
